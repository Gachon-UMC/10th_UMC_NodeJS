export interface UserSignUpRequest {
  /** * 유저 이메일 (로그인 및 중복 체크 식별자로 사용) 
   * @example "test@example.com"
   */
  email: string;

  /** * 유저 이름 (실명) 
   * @example "홍길동"
   */
  name: string;

  /** * 유저 성별 (예: "남성", "여성") 
   * @example "여성"
   */
  gender: string;

  /** * 유저 생년월일 (YYYY-MM-DD 형식) 
   * @example "2000-01-01"
   */
  birth: string;

  /** * 기본 주소 (선택 항목) 
   * @example "서울시"
   */
  address?: string;       

  /** * 상세 주소 (선택 항목) 
   * @example "UMC구 챌린저동 화이팅아파트"
   */
  detailAddress?: string;

  /** * 유저 전화번호 (하이픈 포함 형식 권장) 
   * @example "010-1234-5678"
   */
  phoneNumber: string;

  /** * 유저가 선택한 선호 카테고리 ID 배열 
   * @example [1, 2]
   */
  preferences: number[];
}


export interface UserSignUpResponse {
    /** * 가입 완료 후 등록된 유저의 선호 카테고리 목록 
     * @example ["일식", "중식"]
     */
    preferCategory: any[]; // 💡 추후 string[] 이나 구체적인 Category 인터페이스[]로 대체하는 것을 권장합니다.

    /** * 가입 완료된 유저 이메일 
     * @example "test@example.com"
     */
    email: string;

    /** * 가입 완료된 유저 이름 
     * @example "홍길동"
     */
    name: string;
}









