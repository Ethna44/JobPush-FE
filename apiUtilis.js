const callOffresApi = async (
  tokenManager,
  KeyWord,
  Sector,
  contractType,
  region
) => {
  try {
    KeyWord = KeyWord || "";
    Sector = Sector || "";
    contractType = contractType || "";
    region = region || "";

    const token = await tokenManager.getToken();
    console.log("🔑 Token récupéré :", token);

    const response = await fetch(
      `https://api.pole-emploi.io/partenaire/offresdemploi/v2/offres/search?motsCles=${KeyWord}&grandDomaine=${Sector}&typeContrat=${contractType}&region=${region}`,
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
async function reverseGeocode(latitude, longitude) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  console.log("🌍 URL:", url);
  const response = await fetch(url, {
    headers: {
      "User-Agent": "YourAppName/1.0 (your@email.com)", // important avec Nominatim
    },
  });

  const data = await response.json();

  const address = data.address || {};
  console.log("🏠 Adresse récupérée :", address.house_number);
  return {
    streetNumber: address.house_number || " ",
    streetName: address.road || "",
    city: address.city || address.town || address.village || "",
    zipCode: address.postcode || "",
  };
}

function fusionWord(str) {
  return str.trim().split(/\s+/).join("&");
}

module.exports = {
  callOffresApi,
  reverseGeocode,
  fusionWord,
};
