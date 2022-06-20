export const getUrlParam = () => {
	let channel = "default";

	const params = new URLSearchParams(window.location.search)
	const channel_temp = params.get('canal')

	//* Validando la exitenia de un canal en la url
	if (channel_temp !== null) {
		channel = channel_temp;
	}

  return channel
}