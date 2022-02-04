// const getUser = async () => {
//   await window.Kakao.API.request({
//     url: "/v2/user/me",
//     success: async function (response) {
//       console.log("response", response);
//       getUserLocation();
//     },
//     fail: function (error) {
//       console.log("error", error);
//     },
//   });
// };

const getUserLocation = () => {
  let lat = 0;
  let lng = 0;
  const onGeoOk = (position) => {
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    return getAddr(lat, lng);
  };

  const onGeoError = () => {
    console.log("위치를 알 수 없습니다.");
  };

  const getAddr = (lat, lng) => {
    let geocoder = new window.kakao.maps.services.Geocoder();

    let coord = new window.kakao.maps.LatLng(lat, lng);

    let callback = function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        // console.log(
        //   "location",
        //   result[0].address.address_name.split(" ", 2).join(" ")
        // );
        const location = result[0].address.address_name.split(" ", 2).join(" ");
        console.log("location", location);
        return location;
      }
    };

    return geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  return window.navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
};

const kakaoApi = { getUserLocation };

export default kakaoApi;
