exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  const { name, email, company, message } = JSON.parse(event.body)

  if (!name || !email || !message) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) }
  }

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: 'Side Studio Website', email: 'sidecreativestudio@gmail.com' },
      to: [{ email: 'sidecreativestudio@gmail.com', name: 'Side Creative Studio' }],
      replyTo: { email, name },
      subject: `New inquiry from ${name}${company ? ` — ${company}` : ''}`,
      htmlContent: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company / Occupation:</strong> ${company}</p>` : ''}
        <hr />
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send email', details: err }) }
  }

  return { statusCode: 200, body: JSON.stringify({ success: true }) }
}
