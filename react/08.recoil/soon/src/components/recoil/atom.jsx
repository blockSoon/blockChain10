import {atom, selector} from "recoil";
import {recoilPersist} from "recoil-persist"

// 스토어 하나 생성
export const contentState = atom({
    key : "content",
    default : {
        name :"test",
        status : "테스트중",
        massage : "테스트 메시지",
        pageIndex : 0
    }
})

// 스토어의 값을 가지고 연산을 해보자
// 페이지네이션으로 페이지의 게시판 정보들을 가지고 오는 경우를 만들어보자
// 다른 스토어의 값으로 연산을 통해 전역상태로 유지 selector
export const pagination = selector({
    key : "pagination",
    get : ({get})=>{
        // get 받은 인자값은 다른 스토어의 값을 참조할수있는 메서드
        // await new Promise((res,rej)=>{
        //     setTimeout(()=>{
        //         res();
        //     }, 1000)
        // })
        const {pageIndex} = get(contentState);
        return `page${pageIndex} 번째 리스트`
    },
    set : ({set, get}, newState)=>{
        // set 다른 스토어의 값을 변경할경우
        // void 함수여야 한다(반환값 없는 함수)
        console.log(newState);
        // get도 필요한데?
        // get도 가지고와서 사용할수있다.
        const content = get(contentState);
        // 첫번째 인자가 상태를 변경하고싶은 스토어를 전달
        // 두번째 인자값이 업데이트할 내용
        set(contentState, {...content, pageIndex: newState.pageIndex})
    }
})

export const pagination2 = selector({
    key : "pagination2",
    get : async ({get})=>{
        await new Promise((res,rej)=>{
            setTimeout(() => {
               res(); 
            }, 1000);
        })
        const {pageIndex} = get(contentState);
        return `page${pageIndex}번 리스트 목록`
    },
    set : ({}) =>{

    }
})
// const app = ({key1 : newKeyName, key2}) =>{
//     key1
//     key2
// }
// const temp = {
//     key1 : "",
//     key2 : ""
// }
// const {key1, key2} = temp;

// app(temp)

// recoilPersist 인스턴스 생성
const {persistAtom} = recoilPersist({
    key : "loginPersist",// 고유한 이름 식별자
    storage : localStorage
})

export const Login = atom({
    key : "Login",
    default : {
        isLogin : false,
        uid : "",
        upw : ""
    },
    // 부수적인 효과를 관리하는 속성
    // effects 전역상태를 업데이트할때
    effects : [persistAtom
        // ({setSelf, onSet}) =>{
        //     // setSelf : atom값을 재설정 할때 사용
        //     setSelf({
        //         isLogin : false,
        //         uid : "",
        //         upw : ""
        //     })

        //     // onSet 전역상태의 변화가 감지되면 호출된다.
        //     onSet((newVale, prev )=>{
        //         // newVale 전역상태를 변경했을때 들어온 상태
        //         // prev 전역상태가 변경 되기 전 상태
        //         // 로컬스토리지에 저장하는 내용을 여기에 작성한것이 리코일 파시스트
        //         console.log("newVale",newVale)
        //         console.log("prev",prev)

        //         // 리코일 파시스트 라이브러리 사용안하고 로컬스토리지에 상태를 저장하는 내용을 작성한다 하면
        //         // 1. 로컬스토리지에 키를 조회해서 값이 있는지 확인을 하고
        //         // 2. 로컬스토리지에 저장한 값이 있으면 setSelf메서드를 사용해서 상태값으로 업데이트
        //         // 3. 상태가 로컬스토리지에 있는 값으로 업데이트 되겠다.
        //     })
        // }
    ]
})

export const LoginCheck = selector({
    key : "LoginCheck",
    get : async ({get})=>{
        await new Promise((res,rej)=>{
            const uid = "123"
            const upw = "456"
            const {uid : _uid, upw : _upw} = get(Login);
            if(uid == _uid && upw == _upw){
                res()
            }else rej();
        })
        return "로그인 성공";
    }
})