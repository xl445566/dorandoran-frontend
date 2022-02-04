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

const getUserLocation = (setLocation) => {
  let lat = 0;
  let lng = 0;

  const onGeoOk = (position) => {
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    // console.log("위치정보", lat);
    // console.log("위치정보", lng);
    getAddr(lat, lng);
  };

  const onGeoError = () => {
    console.log("위치를 알 수 없습니다.");
  };

  const getAddr = (lat, lng) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(lat, lng);

    const callback = function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        console.log(
          "location",
          result[0].address.address_name.split(" ", 2).join(" ")
        );
        setLocation(result[0].address.address_name.split(" ", 2).join(" "));
      }
    };

    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  window.navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
};

const kakaoApi = { getUserLocation };

export default kakaoApi;
