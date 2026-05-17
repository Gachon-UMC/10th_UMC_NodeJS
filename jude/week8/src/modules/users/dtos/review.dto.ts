export interface ReviewData {
    /** * 리뷰 고유 식별자 ID 
     * @example 1
     */
    id: number;

    /** * 리뷰 본문 내용 
     * @example "음식이 정말 맛있고 배달도 빨라요! 추천합니다."
     */
    content: string;

    /** * 평점 점수 (예: 1점 ~ 5점) 
     * @example 5
     */
    score: number;

    /** * 리뷰 작성 일시 (ISO 8601 string 또는 YYYY-MM-DD 형식) 
     * @example "2026-05-16T12:34:56.789Z"
     */
    createdAt: string;

    /** * 리뷰를 작성한 유저의 닉네임 
     * @example "맛있는거좋아"
     */
    nickname: string;

    /** * 리뷰에 첨부된 이미지 목록 
     * @example ["https://example.com/images/review1.jpg"]
     */
    reviewImages: any[]; // 💡 추후 string[] 이나 구체적인 Image 인터페이스[]로 타입을 좁혀주면 더 안전합니다.

    /** * 사장님이 작성한 답글 내용 (답글이 없으면 null) 
     * @example "소중한 리뷰 감사합니다! 다음에 또 주문해 주세요."
     */
    ownerReply: string | null;
}


export interface ReviewListResponse {
    /** * 페이징 처리되어 반환된 리뷰 목록 데이터 배열 */
    reviewData: ReviewData[];

    /** * 다음 페이지 조회를 위한 커서 ID (마지막 페이지라면 null) 
     * @example 15
     */
    cursor: number | null;

    /** * 다음 페이지가 없는 마지막 페이지인지 여부 
     * @example false
     */
    isLastPage: boolean;
}