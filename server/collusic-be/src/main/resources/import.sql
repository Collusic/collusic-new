insert into member (member_id, auth_id, email, nickname, role, sns_type) values (1, 'test_auth_id', 'test@collusic.com', 'test_user1', 'USER', 'KAKAO');
insert into member (member_id, auth_id, email, nickname, role, sns_type) values (2, 'test_auth_id2', 'test2@collusic.com', 'test_user2', 'USER', 'KAKAO');

insert into project (project_id, project_name, bpm, file_url) values (1, 'test project', 50, 'test_url');
insert into project (project_id, project_name, bpm, file_url) values (2, 'test project', 50, 'test_url');
insert into project (project_id, project_name, bpm, file_url) values (3, 'test project', 50, 'test_url');
insert into project (project_id, project_name, bpm, file_url) values (4, 'test project', 50, 'test_url');
insert into project (project_id, project_name, bpm, file_url) values (5, 'test project', 50, 'test_url');

insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (1, 1, 'test', 0, 2, 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (2, 1, 'test', 1, 2, 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (3, 1, 'test', 2, 2, 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (4, 1, 'test', 3, 2, 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (5, 1, 'test', 4, 2, 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (6, 1, 'test', 5, 2, 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (7, 1, 'test', 6, 2, 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (8, 1, 'test', 7, 2, 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (9, 1, 'test', 8, 2, 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (10, 1, 'test', 9, 2, 'test1', 'PIANO');

insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (11, 1, 'test', 0, 3, 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (12, 1, 'test', 1, 3, 'test1', 'PIANO');

insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (13, 1, 'test', 0, 4, 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (14, 2, 'test', 1, 4, 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (15, 1, 'test', 0, 5, 'test1', 'PIANO');