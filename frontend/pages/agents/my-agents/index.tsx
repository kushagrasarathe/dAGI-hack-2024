import TrainAgent from "./train-agent";

import { getUser } from "@/utils/graphFunctions";
import { generateImage } from "@/utils/tools";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Index() {
  const { address: userAccount } = useAccount();
  const router = useRouter();
  const [threadMessages, setthreadMessages] = useState<any[]>();
  const [threadID, setThreadID] = useState<string>();
  const [assistantID, setAssistantID] = useState<string>();
  const [inputPrompt, setInputPrompt] = useState<string>();
  const [subscriptionsData, setSubscriptionsData] = useState<any[]>();

  const getAssistant = async (assistantID: string) => {
    console.log("Fetching Assistant... Calling OpenAI");
    if (!assistantID) {
      console.log("Agent Details missing");
      return;
    }
    if (!assistantID.startsWith("asst_")) {
      return null;
    }
    const data = await fetch(
      `/api/openai/getAssistant?assistantId=${assistantID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return data;
  };

  const getUserData = async () => {
    if (!userAccount) {
      console.log("User Account not found");
      return;
    }
    const data = await getUser(userAccount);
    console.log(data);
    const agentsSubscribedTo = data.user?.agentsSubscribedTo;
    let agentSubscriptionData = [];
    for (let i = 0; i < agentsSubscribedTo?.length; i++) {
      const assistantId = agentsSubscribedTo[i].agent.assistantId;
      const assistantData = await getAssistant(assistantId);
      console.log(assistantData);
      const agentSubscription = {
        agentName: assistantData?.name,
        agentId: agentsSubscribedTo[i].agent.agentID,
        assistantId: agentsSubscribedTo[i].agent.assistantId,
        threadID: agentsSubscribedTo[i].threadID,
      };
      agentSubscriptionData.push(agentSubscription);
    }
    setSubscriptionsData(agentSubscriptionData);
  };

  useEffect(() => {
    if (userAccount && !subscriptionsData) {
      getUserData();
    }
  }, [userAccount]);

  const sendMessage = async () => {
    try {
      console.log("Sending msg... Calling OpenAI");
      if (!assistantID) {
        console.log("Agent Details missing");
        return;
      }
      if (!inputPrompt) {
        console.log("Input prompt missing");
        return;
      }

      if (!threadID) {
        console.log("Thread id missing...");
        return;
      }

      fetch("/api/openai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadID: threadID,
          messageContent: inputPrompt,
          fileIds: [],
        }),
      })
        .then(async (res) => {
          console.log(res);
          const data = await res.json();
          console.log(data);
          await runThread();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const runThread = async () => {
    try {
      console.log("running thread... Calling OpenAI");
      if (!assistantID) {
        console.log("Agent Details missing");
        return;
      }

      if (!threadID) {
        console.log("thread Details missing");
        return;
      }

      await fetch("/api/openai/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadId: threadID,
          assistantId: assistantID,
          instructions: "",
        }),
      })
        .then(async (res) => {
          console.log(res);
          const data = await res.json();
          console.log(data);
          // getThread(threadID, assistantID);
          await pollRun(threadID, data.id, assistantID);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const pollRun = async (
    _threadID: string,
    _runId: string,
    _assistantID: string
  ) => {
    if (!_runId) {
      console.log("Run Details missing");
      return;
    }
    if (!_threadID) {
      console.log("thread Details missing");
      return;
    }
    const _run = await getRun(_threadID, _runId);
    if (_run) {
      if (_run?.status === "requires_action") {
        console.log("thread Run requires action");
        // 4. If needed perform functions and return result
        const toolCalls = _run.required_action?.submit_tool_outputs.tool_calls;
        toolCalls.forEach(async (toolCall: any) => {
          console.log(toolCall);
          const toolOutput = await performToolCall(toolCall);
          if (toolOutput) {
            const toolOutputs = {
              tool_call_id: toolCall.id,
              output: toolOutput,
            };
            // 5. Submit tool output if there via the API
            await submitToolOutput(_threadID, _runId, toolOutputs);
          }
        });

        return;
      } else if (_run?.status === "completed") {
        console.log("thread Run completed");

        // 6. Get the thread and return
        const threadContent = await getThread(_threadID, _assistantID);
        return;
      } else if (_run?.status === "in_progress" || _run?.status === "queued") {
        // Re call Poll run and wait for it until the status is completed
        console.log("thread Run in progress");
        setTimeout(async () => {
          await pollRun(_threadID, _runId, _assistantID);
        }, 2000);
      } else {
        console.log("thread Run invalid");
        return;
      }
    }
  };

  const availableFunctions: {
    [key: string]: (imagePrompt: string) => Promise<any>;
  } = {
    generate_image: generateImage,
  };

  const performToolCall = async (toolCall: any): Promise<any | undefined> => {
    try {
      const functionToCall = availableFunctions[toolCall.function.name];
      console.log(functionToCall);
      const functionArgs = JSON.parse(toolCall.function.arguments);
      console.log(functionArgs);
      // functionArgs is an object
      console.log("Generating Image");
      const functionResponse = await functionToCall(functionArgs.imagePrompt);
      console.log(functionResponse);
      return functionResponse;
    } catch (error) {
      console.log(error);
    }
  };

  interface toolOutputsType {
    tool_call_id: string;
    output: string;
  }
  [];

  const submitToolOutput = async (
    _threadID: string,
    _runID: string,
    toolOutputs: toolOutputsType
  ) => {
    try {
      console.log("Submitting too Output... Calling OpenAI");

      if (!_threadID) {
        console.log("thread Details missing");
        return;
      }

      if (!_runID) {
        console.log("thread Details missing");
        return;
      }

      return await fetch("/api/openai/submitToolOutput", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadID: _threadID,
          runID: _runID,
          toolOutputs: toolOutputs,
        }),
      })
        .then(async (res) => {
          console.log(res);
          const data = await res.json();
          console.log(data);
          return data;
          // getThread(threadID, assistantID);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getRun = async (
    _threadID: string,
    _runId: string
  ): Promise<any | undefined> => {
    console.log("Fetching Run... Calling OpenAI");
    if (!_runId) {
      console.log("Run Details missing");
      return;
    }

    if (!_threadID) {
      console.log("thread Details missing");
      return;
    }
    console.log(_threadID, _runId);
    const data = await fetch(
      `/api/openai/checkRun?threadID=${_threadID}&runID=${_runId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        console.log(res);
        const data = await res.json();
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return data;
  };

  const getThread = async (_threadID: string, _assistantID: string) => {
    console.log("Fetching thread... Calling OpenAI");
    if (!_assistantID) {
      console.log("Agent Details missing");
      return;
    }

    if (!_threadID) {
      console.log("thread Details missing");
      return;
    }
    // body: JSON.stringify({
    //   threadId: threadID,
    // }),
    const data = await fetch(`/api/openai/getChat?threadId=${_threadID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        console.log(res);
        const data = await res.json();
        console.log(data);
        const messages = data.data;
        console.log(messages);
        setthreadMessages(messages);
      })
      .catch((err) => {
        console.log(err);
      });
    return data;
  };

  // "thread_nf2kCoESw6fyC9jvGlgKl6Fv";
  // "run_uhHtsA6BWnu47j888RCX4ICJ"
  // "asst_ieJL0i6m3WHNmjLcZnDSvAAV"
  const useThread = async () => {
    try {
      console.log("Sending msg... Calling OpenAI");
      if (!assistantID) {
        console.log("Agent Details missing");
        return;
      }
      if (!inputPrompt) {
        console.log("Input prompt missing");
        return;
      }

      if (!threadID) {
        console.log("Thread id missing...");
        return;
      }
      fetch("/api/openai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadID: threadID,
          messageContent: inputPrompt,
          assistantId: assistantID,
          instructions: "",
          fileIds: [],
        }),
      })
        .then(async (res) => {
          console.log(res);
          const data = await res.json();
          console.log(data);
          await runThread();
          // setTimeout(() => {
          //   // Code to execute after 2 seconds
          // }, 2000); // 2000 milliseconds = 2 seconds
          // let tm = await getThread(threadID, assistantID);
          // if (tm !== undefined) {
          //   setthreadMessages(tm);
          // }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 border rounded-lg">
          <div className="font-semibold text-lg tracking-tight p-4 border-b">
            Your Agents
          </div>

          {/* {subscriptionsData &&
                    subscriptionsData.map((subscription: any) => {
                      return (
                        <li>
                          <button
                            type="button"
                            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-orange-200"
                            onClick={() => {
                              setAssistantID(subscription.assistantId);

                              setThreadID(subscription.threadID);

                              getThread(
                                subscription.threadID,
                                subscription.assistantId
                              );
                            }}
                          >
                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                              {subscription.agentName}
                            </span>
                          </button>
                        </li>
                      );
                    })} */}
          <div className=" max-h-[74vh] overflow-auto">
            {subscriptionsData &&
              subscriptionsData.map((agent: any, idx) => (
                <div
                  key={idx}
                  className="space-y-1 border-b px-4 py-2 hover:bg-gray-100 cursor-pointer transition delay-100"
                >
                  <div>{agent.agentName}</div>
                  {/* <div className="text-xs line-clamp-1 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Optio sit incidunt reiciendis totam ducimus iusto recusandae
                    ratione, beatae perferendis fuga provident impedit, earum
                    eaque aliquam ad nesciunt. Ullam, neque quia.
                  </div> */}
                </div>
              ))}
          </div>
        </div>
        <div className="col-span-9 col-start-4 space-y-4">
          <TrainAgent sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}
