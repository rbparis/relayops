export default function LeadDetailPreview() {
  const timeline = [
    { time: "9:02 AM", event: "Customer called after searching for emergency AC repair." },
    { time: "9:03 AM", event: "🔥EMBUR sent an instant follow-up text." },
    { time: "9:05 AM", event: "Customer shared name, phone number, and service issue." },
    { time: "9:10 AM", event: "Office team was notified with lead details." },
    { time: "9:20 AM", event: "Appointment was booked for today." },
  ];

  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <div className="text-center mb-12">
        <p className="text-blue-700 font-semibold">Lead Detail Preview</p>
        <h3 className="mt-3 text-4xl font-bold">
          See exactly what happened with every lead.
        </h3>
        <p className="mt-4 text-lg text-slate-600">
          EMBUR shows the full customer journey from missed call to booked appointment.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border bg-white p-8 shadow-xl">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-blue-700">Booked Lead</p>
              <h4 className="mt-2 text-3xl font-bold">John Smith</h4>
              <p className="mt-2 text-slate-600">Emergency AC Repair</p>
            </div>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              Booked
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Phone</p>
              <p className="mt-2 font-semibold">(555) 555-1212</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Address</p>
              <p className="mt-2 font-semibold">123 Main Street</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Service Needed</p>
              <p className="mt-2 font-semibold">No cooling</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Estimated Value</p>
              <p className="mt-2 font-semibold">$750–$1,500</p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition">
              Send Text
            </button>
            <button className="rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50 transition">
              Call Customer
            </button>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-xl">
          <h4 className="text-xl font-bold">Lead Timeline</h4>

          <div className="mt-6 space-y-5">
            {timeline.map((item) => (
              <div key={item.time} className="flex gap-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-blue-600" />
                <div>
                  <p className="font-semibold">{item.time}</p>
                  <p className="text-slate-600">{item.event}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-blue-50 p-5">
            <p className="font-semibold text-blue-900">🔥EMBUR Note</p>
            <p className="mt-2 text-blue-800">
              This lead was recovered automatically after a missed call and turned into a same-day appointment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}