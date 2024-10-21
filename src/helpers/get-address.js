export async function getAdress(ip='8.8.8.8') {

    const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=edad7708995f4ec78635a1f9de86dea9&ip_address=${ip}`)
        return await response.json();

}
