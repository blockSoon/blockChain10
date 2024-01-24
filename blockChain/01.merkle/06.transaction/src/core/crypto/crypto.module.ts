class CryptoModule {
    // 우리가 블록을 생성할때 해시값을 받아서 2진수로 변환해서 
    // 난이도 충족하는 값을 비교할때 사용할 2진수 값
    // 난이도가 2면 2진수 값이 앞에서부터 난이도의 갯수만큼 0이 포함되어있는지 검사를 해야함.
    static hashToBinary(hash : string) : string {
        let binary : string = "";
        // 16 진수를 -> 2진수로 바꿀 식
        for (let i = 0; i < hash.length; i++) {
            // 반복문에서 현재 인덱스 2자리
            const hexByte = hash.substr(i,2);

            // 16진수의 바이트를 10진수로 반환
            const dec = parseInt(hexByte, 16);

            // 10진수를 2진 문자열로 반환
            // 8자리로 고정 8자리가 안되면 앞자리 패딩
            const binaryByte = dec.toString(2).padStart(8, "0");

            // 현재의 2진 바이트를 최종 이진 문자열에 추가
            binary += binaryByte;
        }

        return binary;
    }
}

export default CryptoModule;