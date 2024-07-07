import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface TrainAgentProps {
  threadID: string;
  assistantID: string;
}

const TrainAgent = ({ threadID, assistantID }: TrainAgentProps) => {
  const [threadMessages, setthreadMessages] = useState<any[]>();
  const [inputPrompt, setInputPrompt] = useState<string>();

  useEffect(() => {
    if (!threadID || !assistantID) return;

    getThread(threadID, assistantID);
  }, [threadID, assistantID]);

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
          let tm = await getThread(threadID, assistantID);
          if (tm !== undefined) {
            setthreadMessages(tm);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border rounded-lg h-[82vh]">
      <div className="w-full pt-4 px-4 border-b">
        <h2 className="font-semibold text-lg tracking-tight pb-4">Use Agent</h2>
      </div>

      <div
        className="h-[68vh] overflow-auto w-full relative px-6"
        // style={{ minWidth: "100%", display: "table" }}
      >
        {threadMessages &&
          threadMessages
            .slice()
            .reverse()
            .map((msg, idx) => {
              const messageContent = msg.content[0]?.text.value;

              if (msg.role === "user") {
                return (
                  <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                    <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                      <div className="rounded-full bg-gray-100 border p-1">
                        <svg
                          stroke="none"
                          fill="black"
                          stroke-width="0"
                          viewBox="0 0 16 16"
                          height="20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                        </svg>
                      </div>
                    </span>
                    <p className="leading-relaxed">
                      <span className="block font-bold text-gray-700">
                        You{" "}
                      </span>
                      {messageContent}
                    </p>
                  </div>
                );
              } else {
                <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                    <div className="rounded-full bg-gray-100 border p-1">
                      <svg
                        stroke="none"
                        fill="black"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                        ></path>
                      </svg>
                    </div>
                  </span>
                  <p className="leading-relaxed">
                    <span className="block font-bold text-gray-700">AI </span>
                    {messageContent}
                  </p>
                </div>;
              }
            })}
      </div>
      <div className="flex items-center w-full justify-between gap-3 pt-2 border-t px-4">
        <Input
          placeholder="Type your message"
          className="w-full"
          onChange={(e) => setInputPrompt(e.target.value)}
        />
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
          onClick={() => {
            useThread();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default TrainAgent;
