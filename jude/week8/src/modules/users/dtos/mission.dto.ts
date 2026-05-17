import { MissionStatus } from "../../../generated/prisma/enums.js";

export interface MissionListResponse {
    /** * 페이징 처리되어 반환된 유저의 미션 목록 데이터 배열 */
    missions: MissionData[];

    /** * 다음 페이지 조회를 위한 커서 ID (마지막 페이지라면 null) 
     * @example 24
     */
    cursor: number | null;

    /** * 다음 페이지가 없는 마지막 페이지인지 여부 
     * @example false
     */
    isLastPage: boolean;
}

export interface MissionActionResponse {
    /** * 새로 생성되거나 변경된 유저 미션(MemberMission) 매핑 테이블의 고유 식별자 ID 
     * @example 7
     */
    id: number;

    /** * 현재 변경된 미션의 상태 (예: "CHALLENGING", "COMPLETE") 
     * @example "CHALLENGING"
     */
    status: MissionStatus;

    /** * 미션을 진행하는 유저의 고유 식별자 ID 
     * @example 1
     */
    userId: number;

    /** * 도전 또는 완료 처리한 원본 미션의 고유 식별자 ID 
     * @example 12
     */
    missionId: number;

    /** * 미션 도전을 시작한(데이터가 생성된) 일시 
     * @example "2026-05-16T22:00:00.000Z"
     */
    createdAt: string | Date; 

    /** * 미션 상태가 마지막으로 변경된(완료 처리 등) 일시 
     * @example "2026-05-16T22:05:00.000Z"
     */
    updatedAt: string | Date;
}

export interface MissionData {
    /** * 유저 미션(MemberMission)의 고유 식별자 ID 
     * @example 7
     */
    id: number;

    /** * 해당 미션의 진행 상태 (예: "CHALLENGING", "COMPLETE") 
     * @example "CHALLENGING"
     */
    status: MissionStatus;

    /** * 미션에 처음 참여한 일시 
     * @example "2026-05-16T22:00:00.000Z"
     */
    createdAt: string;

    /** * 미션 정보가 최근에 업데이트된 일시 
     * @example "2026-05-16T22:00:00.000Z"
     */
    updatedAt: string;

    /** * 미션 성공 시 지급되는 리워드 포인트/포인트 금액 
     * @example 500
     */
    reward: number;

    /** * 미션의 구체적인 수행 조건 및 내용 설명 
     * @example "가게 방문 후 15,000원 이상 주문 및 리뷰 작성하기"
     */
    missionSpec: string;

    /** * 미션 대상 가게의 이름 
     * @example "엄청나게맛있는치킨 성남점"
     */
    storeName: string;
}

