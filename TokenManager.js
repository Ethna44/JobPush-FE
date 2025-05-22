export class TokenManager {             
  constructor(clientId, clientSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.token = null;
    this.expiry = null; // timestamp en ms
  }

  async fetchToken() {
    const url = 'https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=/partenaire'; 
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = 'grant_type=client_credentials&scope=api_offresdemploiv2 o2dsoffre';

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Erreur récupération token: ${text}`);
    }

    const data = await res.json();
    this.token = data.access_token;
    this.expiry = Date.now() + (data.expires_in - 60) * 1000; // expire moins 60s
    return this.token;
  }

  async getToken() {
    if (this.token && Date.now() < this.expiry) {
      return this.token;
    }
    return await this.fetchToken();
  }
}