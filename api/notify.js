export default async function handler(req, res) {
  try {
    var dateLabel, time, name, phone;
    if (req.method === 'POST') {
      var body = req.body;
      if (typeof body === 'string') body = JSON.parse(body);
      dateLabel = body.dateLabel; time = body.time; name = body.name; phone = body.phone;
    } else {
      dateLabel = 'تست'; time = '00:00'; name = 'تست دستی'; phone = '0000000000';
    }
    var msg = 'نوبت جدید ثبت شد\n' + dateLabel + ' ساعت ' + time + '\nمشتری: ' + name + '\nتماس: ' + phone;

    var r = await fetch('https://console.melipayamak.com/api/send/simple/3967054f-57b3-4d26-b916-a20b50e34706', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: '1000029154759', to: '09382838181', text: msg })
    });
    var data = await r.text();
    res.status(200).json({ ok: true, status: r.status, data: data });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
}
