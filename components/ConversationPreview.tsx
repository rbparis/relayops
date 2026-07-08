export default function ConversationPreview() {
  const messages = [
    {
      sender: "Customer",
      time: "10:02 PM",
      text: "Hi, my AC stopped working and the house is getting hot. Are you open?",
      align: "left",
    },
    {
      sender: "Atlas",
      time: "10:02 PM",
      text: "I’m sorry you’re dealing with that. I can help get your information to the office right away. What’s your address?",
      align: "right",
    },
    {
      sender: "Customer",
      time: "10:04 PM",
      text: "123 Main Street. It’s been out since this afternoon.",
      align: "left",
    },
    {
      sender: "Atlas",
      time: "10:04 PM",
      text: "Thank you. I’ve captured your request and notified the team. Someone will follow up as soon as possible.",
      align: "right",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <div className="text-center mb-12">
        <p className="text-blue-700 font-semibold">Customer Conversation</p>
        <h3 className="mt-3 text-4xl font-bold">
          See how RelayOps recovers missed leads.
        </h3>
        <p className="mt-4 text-lg text-slate-600">
          Atlas responds instantly, collects the right details, and alerts the office.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border bg-white p-6 shadow-xl">
          <div className="border-b pb-5">
            <h4 className="text-xl font-bold">Conversation with John Smith</h4>
            <p className="mt-1 text-sm text-slate-500">Emergency AC Repair • After-hours lead</p>
          </div>

          <div className="mt-6 space-y-5">
            {messages.map((message) => (
              <div
                key={message.text}
                className={`flex ${
                  message.align === "right" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md rounded-2xl p-4 ${
                    message.align === "right"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-900"
                  }`}
                >
                  <div className="flex justify-between gap-6 text-xs opacity-80">
                    <span>{message.sender}</span>
                    <span>{message.time}</span>
                  </div>
                  <p className="mt-2">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border bg-slate-900 p-8 text-white shadow-xl">
          <p className="text-blue-200 font-semibold">Atlas Summary</p>

          <h4 className="mt-3 text-3xl font-bold">
            This missed call became a qualified lead.
          </h4>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-white/10 p-5">
              ✅ Customer issue confirmed: AC stopped working.
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              📍 Address captured: 123 Main Street.
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              🔔 Office notified immediately.
            </div>
            <div className="rounded-2xl bg-green-500/20 p-5">
              💰 Estimated job value: $750–$1,500.
            </div>
          </div>

          <button className="mt-8 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-700 transition">
            View Lead Details
          </button>
        </div>
      </div>
    </section>
  );
}