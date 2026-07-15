export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    var body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);
    var dateLabel = body.dateLabel, time = body.time, name = body.name, phone = body.phone;
    var msg = 'نوبت جدید ثبت شد\n' + dateLabel + ' ساعت ' + time + '\nمشتری: ' + name + '\nتماس: ' + phone;

    var r = await fetch('https://console.melipayamak.com/api/send/simple/2d53c1c0-69be-4fde-9846-f98ff7f626f0', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: '10000291547590', to: '09106984220', text: msg })
    });
    var data = await r.text();
    console.log('MELIPAYAMAK_RESPONSE_STATUS:', r.status);
    console.log('MELIPAYAMAK_RESPONSE_BODY:', data);
    res.status(200).json({ ok: true, data: data });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
}
