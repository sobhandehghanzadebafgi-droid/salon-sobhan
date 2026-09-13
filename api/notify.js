export default async function handler(req, res) {
  try {
    var dateLabel, time, name, phone, note, services, totalPrice;
    if (req.method === 'POST') {
      var body = req.body;
      if (typeof body === 'string') body = JSON.parse(body);
      dateLabel = body.dateLabel; time = body.time; name = body.name; phone = body.phone; note = body.note;
      services = body.services; totalPrice = body.totalPrice;
    } else {
      dateLabel = 'تست'; time = '00:00'; name = 'تست دستی'; phone = '0000000000'; note = '';
      services = ''; totalPrice = 0;
    }
    var msg = 'نوبت جدید ثبت شد\n' + dateLabel + ' ساعت ' + time + '\nمشتری: ' + name + '\nتماس: ' + phone;
    if (services) msg += '\nخدمات: ' + services;
    if (totalPrice) msg += '\nمبلغ: ' + Number(totalPrice).toLocaleString() + ' تومان';
    if (note) msg += '\nتوضیحات: ' + note;

    var r = await fetch('https://console.melipayamak.com/api/send/simple/e2c4164507f64305a4e488f79729e300', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: '10000291547590', to: '09382838181', text: msg })
    });
    var data = await r.text();
    res.status(200).json({ ok: true, status: r.status, data: data });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
}
