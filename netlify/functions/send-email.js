exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  if (!process.env.BREVO_API_KEY) {
    console.error('BREVO_API_KEY environment variable is not set')
    return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error' }) }
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) }
  }

  const { name, email, company, message } = body

  if (!name || !email || !message) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) }
  }

  try {
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

    const responseText = await res.text()
    console.log('Brevo response status:', res.status)
    console.log('Brevo response:', responseText)

    if (!res.ok) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send email', details: responseText }) }
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) }
  } catch (err) {
    console.error('Fetch error:', err.message)
    return { statusCode: 500, body: JSON.stringify({ error: 'Network error', details: err.message }) }
  }
}
