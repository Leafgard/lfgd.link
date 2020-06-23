import React, { useState } from 'react'
import './assets/css/App.css';

function App() {

  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    fetch(`${window.location.origin}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url,
        slug
      })
    })
      .then((resp) => resp.json())
      .then((url) => {
        alert(`URL: ${window.location.origin}/${url.link.slug}`)
      })
      .catch((err) => console.error(err))
  }

  return (
    <div className='mask'>
      <div className='App'>
        <form onSubmit={onSubmit}>
          <h1>Push your URLs with <span style={{ color: '#ED9B40', textDecoration: 'underline' }}>sparkles</span> through the <span style={{ color: '#5658dd', textDecoration: 'underline' }}>stars.</span></h1>
          <br/>
          <input type='url' value={url} onChange={(e) => setUrl(e.target.value)} className='form-input' placeholder='Your best URL'/>
          <br/>
          <br/>
          <input type='text' value={slug} onChange={(e) => setSlug(e.target.value)} className='form-input' placeholder='Your best slug (optional, 5 < slug < 16 chars)'/>
          <br/>
          <input type='submit' className='form-submit' value='FIRE !'/>
        </form>
      </div>
    </div>
  );
}

export default App;
