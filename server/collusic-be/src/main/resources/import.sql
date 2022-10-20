insert into member (member_id, auth_id, email, nickname, role, sns_type) values (1, 'test_auth_id', 'test@collusic.com', 'test_user1', 'USER', 'KAKAO');

insert into project (project_id, project_name, bpm, file_url) values (1, 'test project', 50, 'test_url');
insert into project (project_id, project_name, bpm, file_url) values (2, 'test project', 50, 'test_url');

insert into track (track_id, member_id, editable, file_url, measure, order_in_project, project_id, track_name, track_tag, volume) values (1, 1, true, 'test', 'FOUR', 0, 2, 'test1', 'PIANO', 50);
insert into track (track_id, member_id, editable, file_url, measure, order_in_project, project_id, track_name, track_tag, volume) values (2, 1, true, 'test', 'FOUR', 1, 2, 'test1', 'PIANO', 50);
insert into track (track_id, member_id, editable, file_url, measure, order_in_project, project_id, track_name, track_tag, volume) values (3, 1, true, 'test', 'FOUR', 2, 2, 'test1', 'PIANO', 50);
insert into track (track_id, member_id, editable, file_url, measure, order_in_project, project_id, track_name, track_tag, volume) values (4, 1, true, 'test', 'FOUR', 3, 2, 'test1', 'PIANO', 50);
insert into track (track_id, member_id, editable, file_url, measure, order_in_project, project_id, track_name, track_tag, volume) values (5, 1, true, 'test', 'FOUR', 4, 2, 'test1', 'PIANO', 50);
insert into track (track_id, member_id, editable, file_url, measure, order_in_project, project_id, track_name, track_tag, volume) values (6, 1, true, 'test', 'FOUR', 5, 2, 'test1', 'PIANO', 50);
insert into track (track_id, member_id, editable, file_url, measure, order_in_project, project_id, track_name, track_tag, volume) values (7, 1, true, 'test', 'FOUR', 6, 2, 'test1', 'PIANO', 50);
insert into track (track_id, member_id, editable, file_url, measure, order_in_project, project_id, track_name, track_tag, volume) values (8, 1, true, 'test', 'FOUR', 7, 2, 'test1', 'PIANO', 50);
insert into track (track_id, member_id, editable, file_url, measure, order_in_project, project_id, track_name, track_tag, volume) values (9, 1, true, 'test', 'FOUR', 8, 2, 'test1', 'PIANO', 50);
insert into track (track_id, member_id, editable, file_url, measure, order_in_project, project_id, track_name, track_tag, volume) values (10, 1, true, 'test', 'FOUR', 9, 2, 'test1', 'PIANO', 50);