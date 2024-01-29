# truffle

# react web3 hook

# ERC20

- Dapps 개발을 쉽게 개발할수 있도록 테스트환경도 지원해주는 프레임워크
- 스마트 컨트랙트 컴파일, 배포 및 테스트 기능을 쉽게 할수 있도록 도와준다.

```sh
npx create-react-app erc20

npm i truffle

```

- npx truffle init을 하면 초기 세팅이 되는데 3개의 폴더가 생긴다.

1. contracts : 솔리디티 코드들을 작성한 sol 파일을 담아놓을 폴더 컴파일을 진행하면 .build라는 폴더가 생기고 컴파일된 파일들이 json파일로 생성된다.
2. migrations : 컨트랙트 배포를 진행할 js 코드 구문 작성
3. test : 테스트 파일 작성 폴더.

truffle.config

- 네트워크 속성과 솔리디티 컴파일 버전 정보 명시

# 컴파일

- contracts 폴더에 솔리티디 파일을 작성하고

가나쉬 네트워크 열고

```sh
npx ganache-cli
```

```sh
npx truffle compile
```

- .build폴더가 생성되고 컴파일된 내용이 json파일로 생성된다.

- 배포를 하거나 컴파일을 진행하면 json 파일의 내용이 변경된다.
- 컴파일 -> 배포

- 배포 내용 컨트랙트 이름
- [번호]_[내용]_[파일명].js
- 1_deploy_Counter.js

```sh
 npx truffle mirgrate
```

- 우리가 이전에 진행했던 하드코딩 부분으로 보면
- npx truffle compile == npx solc --abi --bin "파일경로"
- 배포 구문 작성하고 npx truffle mirgrate == sendTransaction에 바이트코드를 담아서 네트워크로 요청 보내서 배포된 컨트랙트의 CA주소를 받는 부분

- CA주소를 잃어버리면..
- npx truffle console을 켜고
- Counter.address를 조회하면 마지막으로 배포를 진행 컨트뢕트의 주소를 확인할수 있다.

- 런타임 환경을 지원해준다.

# remix로 배포를 진행 해보자.

- 우리 디스크에 있는 파일의 내용을 요청으로 보내서 remix 환경에서
- 사용해보자.

```sh
npm i -g @remix-project/remixd
# 우리 디스크 폴더 경로의 파일들을 요청
remixd -s "터미널 상에서 어느 경로를 보낼지" --remix-ide "어디의 remix 페이지 경로에 보낼지"

remixd -s . --remix-ide https://remix.ethereum.org
# 페이지에서 요청을 받아주길 대기중인 상태

# remix 페이지에서 connect to localhost

# 배포하고 테스트 환경이 IDE로 좀더 가독성이 좋고 테스트가 좋다.


[
	{
		"inputs": [],
		"name": "getValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "setValue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}

    608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063209652551461003b5780635524107714610059575b600080fd5b610043610075565b60405161005091906100a1565b60405180910390f35b610073600480360381019061006e91906100ed565b61007e565b005b60008054905090565b8060008190555050565b6000819050919050565b61009b81610088565b82525050565b60006020820190506100b66000830184610092565b92915050565b600080fd5b6100ca81610088565b81146100d557600080fd5b50565b6000813590506100e7816100c1565b92915050565b600060208284031215610103576101026100bc565b5b6000610111848285016100d8565b9150509291505056fea26469706673582212202a86e946824e3ff2a6922656858575619c957cace7602edc267da4c0a75398d164736f6c634300080d0033
]
```

# ERC20

- ERC는 Ethereum Request for Comments의 약자
- ERC 20에서 20은 특정 제안에 번호를 매긴것. 트콘의 샣이나 발행등의 규칙을 의미
- 코드의 내용이 작성되어있는 제안
- 숫자는 큰 의미는 없고 제안의 식별의 숫자라고 보면된다.

# 토큰과 코인

- 토큰과 코인의 차이
- 토큰이 메인넷이 있는냐 토큰은 메인넷이 없는것.
- 토큰을 만들면 해당 네트워크의 체인에 포함이 되는데 토큰 자체의 메인넷이 구현되어있지 않으면 코인이 아니다.

- ERC20
- ERC20은 이더리움 네트워크에서 가장 표준이 되는 토큰, 대체 가능 토큰 가장 기본적인, 교환의 기능을 가지고있는 토큰을 정의한것.

# contract = { soontoken : {0xdagesfsfsafs : 10000}}

# ERC721은 대체 불가능한 토큰 고유한 토큰 아이디가 있다.

# 우리가 작성한 내용이 오픈제플린에 포함되어있는지 확인 해보고 가자

```sh
npm i @openzeppelin/contracts
```


```javascript
Available Accounts
==================
(0) 0xa0dFf90bcc801dBA74e468bA4D773cD99BA0c3A5 (100 ETH)
(1) 0x583818e4854a63a272985B8ce6791FCf423B5D74 (100 ETH)
(2) 0xeCce338d2E286c41dE9A21E4EB3b74d1Bd054b18 (100 ETH)
(3) 0xccBAC090532E54de5E0A46E2e506f1fAeBc4a3cA (100 ETH)
(4) 0x6E336555BC87DcB1f03a772e4af7B9AF6951e8a7 (100 ETH)
(5) 0x08473b02793050390c1A5E413d41D90C10C1DBA6 (100 ETH)
(6) 0xECC6d9ee51F87D226eF835508E4B16dFa6AD67d1 (100 ETH)
(7) 0x6d80Ce6096a9A630f5424164D3287569dbA6660B (100 ETH)
(8) 0xfAb6Ad30c7994E721140B404dD2e1CAA453C6deB (100 ETH)
(9) 0xB80971604522E69815aCe206eab07801239805e0 (100 ETH)

Private Keys
==================
(0) 0xbef7e9b525a32cb3ccc0925f3692e4cd5242a0d454bd86a31826a3df4f08099a
(1) 0x31c4caedeae1d3ea40b7f32c8f51e583a47708a9dc61e30819f155f29742d92e
(2) 0x4d6444460ea05f740c4d299c8403f9e2f1675889abc3d36227436031b23dcaac
(3) 0xef29258eafe1a8a5b71e0e20eaddc6ba31d6d7a5daf541839b2ac863105aecf3
(4) 0x19c83424660307b15c94042f21e61193e4ef3e6a6c793a966d0c83b5c2665640
(5) 0xa6c864eb9e744037f6dbe18b851dce0bc5ee62a69e0a2a021960abc494bae6be
(6) 0xd85d60a861fb15dda427888073b0e5826d8a89a8e7ebe43c0eef36a81e3b91a1
(7) 0xef91f0e2a8f1daa95a733aef03c36fb65da1a18778602a572d1927fc788c42a7
(8) 0x0ce0329f53168c7f57c7f39062be98571299f79bdc8a6e265ca0cf7214fcc3e7
(9) 0x5b0863f2849ff9a1369b2daf71fa8fef72587a8dcb18da04bad847af3b86f8c6

0xc4ed373018f6414f8963516cd94119068e5f9484
```