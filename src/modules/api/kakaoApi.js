const getUserLocation = (setAddress, setIsAddress) => {
  let lat = 0;
  let lng = 0;
  const onGeoOk = (position) => {
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    return getAddr(lat, lng);
  };

  const onGeoError = () => {
    setIsAddress(false);
  };

  const getAddr = (lat, lng) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(lat, lng);

    const callback = function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const address = result[0].address.address_name.split(" ", 2).join(" ");
        setAddress(address);
      }
    };

    return geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  window.navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
};

const kakaoApi = { getUserLocation };

export default kakaoApi;
