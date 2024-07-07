import TrainAgent from "./train-agent";

export default function index() {
  return (
    <div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 border rounded-lg">
          <div className="font-semibold text-lg tracking-tight p-4 border-b">
            Your Agents
          </div>
          <div className=" max-h-[74vh] overflow-auto">
            {[
              "Agent 1",
              "Agent 2",
              "Agent 3",
              "Agent 4",
              "Agent 5",
              "Agent 6",
              "Agent 7",
              "Agent 8",
              "Agent 9",
              "Agent 10",
              "Agent 11",
              "Agent 12",
              "Agent 13",
              "Agent 14",
              "Agent 15",
              "Agent 16",
              "Agent 17",
              "Agent 18",
              "Agent 19",
              "Agent 20",
            ].map((agent, idx) => (
              <div
                key={idx}
                className="space-y-1 border-b px-4 py-2 hover:bg-gray-100 cursor-pointer transition delay-100"
              >
                <div>John Wick</div>
                <div className="text-xs line-clamp-1 text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                  sit incidunt reiciendis totam ducimus iusto recusandae
                  ratione, beatae perferendis fuga provident impedit, earum
                  eaque aliquam ad nesciunt. Ullam, neque quia.
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-9 col-start-4 space-y-4">
          <TrainAgent />
        </div>
      </div>
    </div>
  );
}
