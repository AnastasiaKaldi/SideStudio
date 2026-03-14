const https = require('https')

function brevoRequest(apiKey, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload)
    const options = {
      hostname: 'api.brevo.com',
      path: '/v3/smtp/email',
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
        'content-length': Buffer.byteLength(data),
      },
    }

    const req = https.request(options, (res) => {
      let body = ''
      res.on('data', (chunk) => (body += chunk))
      res.on('end', () => resolve({ status: res.statusCode, body }))
    })

    req.on('error', (err) => reject(err))
    req.write(data)
    req.end()
  })
}

exports.handler = async (event) => {
  console.log('Function invoked, method:', event.httpMethod)

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  const apiKey = process.env.BREVO_API_KEY
  console.log('API key present:', !!apiKey)

  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'BREVO_API_KEY not set' }) }
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }
  }

  const { name, email, company, message } = body
  console.log('Form data received:', { name, email, company, hasMessage: !!message })

  if (!name || !email || !message) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) }
  }

  try {
    const result = await brevoRequest(apiKey, {
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
    })

    console.log('Brevo status:', result.status)
    console.log('Brevo response:', result.body)

    if (result.status >= 400) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Brevo error', details: result.body }),
      }
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) }
  } catch (err) {
    console.error('Request error:', err.message)
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}
