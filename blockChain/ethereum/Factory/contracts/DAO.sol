// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract DAO {
    // 방향성 생태계에 참여해서
    // 거버넌스라는 토큰을 받아서
    // 멤버로 추가를 해줘도 되고

    // 조직을 구성한 컨트랙트 배포자가 멤버를 추가 해줘도 된다.
    address private owner;
    // 멤버들의 추가해줄 상태변수
    mapping(address => bool) private members;
    // 참여한 멤버의 인원
    uint private memberCount;
    // 이 조직에서 제안한 제안들을 담을 상태변수
    Proposal[] public proposals;
    // 제안에 멤버들이 참여했는지
    mapping(address => mapping(uint => bool)) private voted;

    constructor(address _owner) {
        // factory 컨트랙트에서 조직을 만든 사람이 조직 컨트랙트의 주인.
        owner = _owner;
        // 조직 대표도 멤버
        // msg.sender CA factory ==== 
        members[_owner] = true;
        memberCount += 1;
    }

    enum Play {
        loading,
        start,
        end
    }

    // 제안을 만들때 객체의 구성
    struct Proposal {
        string title; // 제안의 제목
        string text; // 제안의 내용
        uint votes; // 투표 수
        Play plays; // 제안이 실행중인지.
        bool execute; // 승인 및 거부
    }

    modifier onlyMenber() {
        require(members[msg.sender], "no member");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier alreadyVote(uint index) {
        require(!voted[msg.sender][index]);
        _;
    }

    // modifier onlyToken() {}

    function setghMenbers(address _address) public onlyOwner {
        // 멤버로 승인
        members[_address] = true;
        // 인원 증가
        memberCount += 1;
    }

    // 누군가 제안을 하자
    // 누가 만드는지 내용
    // 멤버만 호출 가능
    // 멤버가 제안을 만들어서 제시할수 있는 내용의 메서드
    function createProposal(
        string memory _title,
        string memory _text
    ) public onlyMenber {
        proposals.push(
            Proposal({
                title: _title,
                text: _text,
                votes: 0,
                plays: Play.loading,
                execute: false
            })
        );
    }

    // 투표하자
    // 어떤 제안을 투표할지는 인덱스
    function vote(uint _index) public onlyMenber alreadyVote(_index) {
        // 투표하는 제안을 가져오고
        Proposal storage porposal = proposals[_index];

        require(porposal.plays == Play.start);
        // 투표 진행
        proposals[_index].votes += 1;

        // 재투표 불가능
        voted[msg.sender][_index] = true;
    }

    // 조직 대표가 제안을 확인하고 투표를 진행 상태로 만들어 주자
    function startVote(uint _index) public onlyOwner {
        // 투표하는 제안을 가져오고
        Proposal storage porposal = proposals[_index];
        proposals[_index].plays = Play.start;
    }

    // 조직 대표가 투표를 종료 시켜줌
    function endVote(uint _index) public onlyOwner {
        // 투표하는 제안을 가져오고
        Proposal storage _porposal = proposals[_index];
        require(_porposal.plays == Play.start);
        // 총 멤버중 우리가 정하는 퍼센트 이상 참여를 했는지 확인
        require(_porposal.votes > memberCount / 2);

        // 고민하는 사람이나 제안이 맘에 안들어서 투표를 안하면
        // 제안 거부
        proposals[_index].execute = true;
        proposals[_index].plays = Play.end;
    }
}
