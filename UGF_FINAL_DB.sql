-------------- 공지 게시판 DB ------------------------

-- 공지게시판 테이블
create table ugotfilm_notice_board(
   	num number,                     --글번호
   	writer number,            --작성자(유저코드)
	subject varchar2(1000),           --글제목
	reg_date date,                 --작성일
	readcount number default 0,     --조회수
	ref number,                     -- 답글 기준 본글
	re_step number,                 -- 
	re_level number,                -- 
	content varchar2(4000),                --글내용
	ip varchar2(20),                --ip
    upload varchar2(300)               --업로드 파일
);

-- 공지게시판 시퀀스
create sequence ugotfilm_notice_board_seq start with 1 increment by 1 nocache nocycle;

-- 공지게시판 샘플
insert into ugotfilm_notice_board 
values(ugotfilm_notice_board_seq.nextval, 1, '제목1',sysdate,0,ugotfilm_notice_board_seq.nextval,
0,0,'내용 테스트.......','127.0.0.1','sample.txt');

-- 공지게시판 댓글 테이블
create table ugotfilm_notice_comment(            
        pnum number,                       
        num number,                        
        writer number,                       
        reg_date date,                                         
        subject varchar2(4000),               
        ip varchar2(20)                              
);

-- 공지게시판 댓글 시퀀스
create sequence ugotfilm_notice_comment_seq start with 1 increment by 1 nocache nocycle;

-- 공지게시판 댓글 샘플
INSERT INTO ugotfilm_notice_comment(pnum, num, writer, reg_date, subject, ip)
values(1, ugotfilm_notice_comment_seq.nextval, 1,sysdate,'댓글 테스트.......','127.0.0.1');

-- 확인용
select * from ugotfilm_notice_board;
select * from ugotfilm_notice_comment;

-- 영화 코멘트 테이블
create table ugotfilm_movie_comment(            
        pnum number,                       
        num number,                        
        writer number,                       
        reg_date date,                                         
        subject varchar2(4000),               
        ip varchar2(20)                              
);

-- 코멘트 시퀀스
create sequence ugotfilm_movie_comment_seq start with 1 increment by 1 nocache nocycle;

-- 코멘트 샘플
INSERT INTO UGOTFILM_MOVIE_COMMENT(pnum, num, writer, reg_date, SUBJECT, IP)
values(315162, ugotfilm_movie_comment_seq.nextval, 1, sysdate, '잼믰다.4', '127.0.0.1');

-- 확인
select * from ugotfilm_movie_comment;

COMMIT;

-- 삭제
drop table ugotfilm_notice_board;
drop sequence ugotfilm_notice_board_seq;
drop table ugotfilm_notice_comment;
drop sequence ugotfilm_notice_comment_seq;

--------------------------------------------------------

-------------- UGF 관련 DB ------------------------

-- 회원 정보 테이블
create table ugotfilm_user(
	usercode number primary key, -- 유저 고유 번호
	username varchar2(1000), -- 유저 아이디
	password varchar2(1000), -- 유저 비밀번호
	nickname varchar2(1000), -- 유저 닉네임
	joindate Date, -- 유저 가입날짜
	gender varchar2(10), -- 유저 성별 '남', '여'
	birth	number, -- 유저 출생년도
	authRole varchar2(100) -- 유저 포지션
);

-- 회원 유저코드 시퀀스
create sequence ugotfilm_user_usercode_seq start with 1 increment by 1 nocache nocycle;

-- 유저 정보 샘플
INSERT INTO UGOTFILM_USER values(ugotfilm_user_usercode_seq.nextval, 'test123', 'qwe123!@#', 'test', sysdate, '남', '2000', 'ROLE_MEMBER');

SELECT authRole FROM UGOTFILM_USER uu ;

-- 영화 정보 테이블
create table ugotfilm_movie(
	moviecode NUMBER, -- 영화 고유 번호
	title varchar2(300), -- 영화 제목
	poster_url varchar2(100) -- 영화 포스터 url
);

-- 영화 정보 샘플
insert into ugotfilm_movie values (505642, '블랙 팬서: 와칸다 포에버', '/3PCRWLeqp5y20k6XVzcamZR3BWF.jpg');

SELECT * FROM ugotfilm_movie;

-- 장르 정보 테이블
create table ugotfilm_genre(
	genrecode NUMBER PRIMARY KEY, -- 장르 코드
	name varchar2(100) -- 장르 이름
);

insert into ugotfilm_genre VALUES (28, '액션');
insert into ugotfilm_genre VALUES (12, '모험');
insert into ugotfilm_genre VALUES (16, '애니메이션');
insert into ugotfilm_genre VALUES (35, '코미디');
insert into ugotfilm_genre VALUES (53, '스릴러');
insert into ugotfilm_genre VALUES (80, '범죄');
insert into ugotfilm_genre VALUES (18, '드라마');
insert into ugotfilm_genre VALUES (99, '다큐멘터리');
insert into ugotfilm_genre VALUES (10751, '가족');
insert into ugotfilm_genre VALUES (14, '판타지');
insert into ugotfilm_genre VALUES (36, '역사');
insert into ugotfilm_genre VALUES (27, '공포');
insert into ugotfilm_genre VALUES (10402, '음악');
insert into ugotfilm_genre VALUES (9648, '미스터리');
insert into ugotfilm_genre VALUES (10749, '로맨스');
insert into ugotfilm_genre VALUES (878, 'SF');
insert into ugotfilm_genre VALUES (10752, '전쟁');
insert into ugotfilm_genre VALUES (37, '서부');

SELECT * FROM ugotfilm_genre;


-- 인물 정보 저장 테이블

-- 배우
CREATE TABLE ugotfilm_cast(
	personcode NUMBER, -- 사람 고유 번호
	name varchar2(100), -- 사람 이름
	profile_url varchar2(100) -- 사람 이미지
);

-- 배우 정보 샘플
INSERT INTO ugotfilm_cast VALUES (172069, 'Chadwick Aaron Boseman', 'url');

-- 감독
create table ugotfilm_director(
	personcode NUMBER, -- 사람 고유 번호
	name varchar2(100), -- 사람 이름
	profile_url varchar2(100) -- 사람 이미지 url
);

-- 인물 정보 샘플
insert into ugotfilm_director values (1056121, 'Ryan Coogler', 'url');

SELECT * FROM ugotfilm_cast;
SELECT * FROM ugotfilm_director;

-- 선택 정보 저장 테이블

-- 유저 선택 기록 (영화)
create table ugotfilm_movie_choice(
	usercode number, -- 유저 번호
	moviecode number, -- 영화 번호
	choice_date date -- 선택 날짜
);


-- 유저 선택 기록 (감독)
create table ugotfilm_director_choice(
	usercode number, -- 유저 번호
	personcode number, -- 사람 번호
	choice_date date -- 선택 날짜
);

-- 유저 선택 기록 (배우)
create table ugotfilm_cast_choice(
	usercode number, -- 유저 번호
	personcode number, -- 사람 번호
	choice_date date -- 선택 날짜
);

-- 유저 선택 기록 (장르)
create table ugotfilm_genre_choice(
	usercode number, -- 유저 번호
	genrecode number, -- 장르 번호
	choice_date date -- 선택 날짜
);

-- 유저 선택 샘플
INSERT INTO ugotfilm_movie_choice VALUES (1, 505642, sysdate); -- 영화
INSERT INTO ugotfilm_director_choice VALUES (1, 1056121, sysdate); -- 감독
INSERT INTO ugotfilm_cast_choice VALUES (1, 172069, sysdate); -- 배우
INSERT INTO ugotfilm_genre_choice VALUES (1, 28, sysdate); -- 장르
INSERT INTO ugotfilm_genre_choice VALUES (1, 12, sysdate); -- 장르
INSERT INTO ugotfilm_genre_choice VALUES (1, 878, sysdate); -- 장르



SELECT * FROM ugotfilm_movie_choice;
SELECT * FROM ugotfilm_cast_choice;
SELECT * FROM ugotfilm_director_choice;
SELECT * FROM ugotfilm_genre_choice;

COMMIT

------------------------------------------
drop table ugotfilm_user;
DROP SEQUENCE ugotfilm_user_usercode_seq;
drop table ugotfilm_movie;
DROP TABLE ugotfilm_cast;
drop table ugotfilm_director;
drop table ugotfilm_genre;

drop table ugotfilm_cast_choice;
drop table ugotfilm_director_choice;
drop table ugotfilm_genre_choice;
drop table ugotfilm_movie_choice;