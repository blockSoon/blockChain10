// 컨트랙트 배포 구문 작성
// json파일이 필요한데 json파일중에서 어떤 파일?
const Counter = artifacts.require("Counter");

module.exports = (deployer) => {
  // json을 가져와서 만든 인스턴스를 가지고
  // 해당 네트워크에 배포를 진행.
  deployer.deploy(Counter);
  // sendTransaction 으로 바이트 코드를 담아서
  // 컨트랙트 배포했던 부분이 여기
  // CA 를 받을수 있고
};
