export const callOffresApi = async (tokenManager) => {
  try {
    const token = await tokenManager.getToken();
    console.log("✅ Token récupéré :", token);
    const response = await fetch(
      `https://api.pole-emploi.io/partenaire/offresdemploi/v2/offres/search?motsCles=developpeur&commune=75101`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log("✅ Données récupérées :");
    return data;
  } catch (error) {
    console.error("❌ Erreur API :", error.message);
    throw error;
  }
};

export const reverseGeocode = async (lat, lon) => {
  const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'JobPushApp/1.0'
    }
  });

  if (!response.ok) throw new Error('Erreur lors du géocodage inverse');
  const data = await response.json();

  if (data.features && data.features.length > 0) {
    return data.features[0].properties.label; // Adresse complète
  } else {
    throw new Error('Aucune adresse trouvée');
  }
};