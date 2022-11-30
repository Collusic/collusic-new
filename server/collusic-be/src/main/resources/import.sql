insert into member (member_id, auth_id, email, nickname, role, sns_type) values (1, 'test_auth_id', 'test@collusic.com', 'test_user1', 'USER', 'KAKAO');
insert into member (member_id, auth_id, email, nickname, role, sns_type) values (2, 'test_auth_id2', 'test2@collusic.com', 'test_user2', 'USER', 'KAKAO');

insert into project (project_id, project_name, bpm, file_url) values ('247f720a-3eb6-4ba4-9dc9-9f5bde8014a3', 'test project', 50, 'test_url');
insert into project (project_id, project_name, bpm, file_url) values ('e51933e5-1104-4302-905f-7a7629f5bf02', 'test project', 50, 'test_url');
insert into project (project_id, project_name, bpm, file_url) values ('a7fdca9b-23e1-4533-a3c5-8beeb28fb66b', 'test project', 50, 'test_url');
insert into project (project_id, project_name, bpm, file_url) values ('721da6c6-cf51-4000-9853-754b2a2ac193', 'test project', 50, 'test_url');
insert into project (project_id, project_name, bpm, file_url) values ('adf231b2-fe97-4034-8517-1c4a0f3ba742', 'test project', 50, 'test_url');

insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (1, 1, 'test', 0, 'e51933e5-1104-4302-905f-7a7629f5bf02', 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (2, 1, 'test', 1, 'e51933e5-1104-4302-905f-7a7629f5bf02', 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (3, 1, 'test', 2, 'e51933e5-1104-4302-905f-7a7629f5bf02', 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (4, 1, 'test', 3, 'e51933e5-1104-4302-905f-7a7629f5bf02', 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (5, 1, 'test', 4, 'e51933e5-1104-4302-905f-7a7629f5bf02', 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (6, 1, 'test', 5, 'e51933e5-1104-4302-905f-7a7629f5bf02', 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (7, 1, 'test', 6, 'e51933e5-1104-4302-905f-7a7629f5bf02', 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (8, 1, 'test', 7, 'e51933e5-1104-4302-905f-7a7629f5bf02', 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (9, 1, 'test', 8, 'e51933e5-1104-4302-905f-7a7629f5bf02', 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (10, 1, 'test', 9, 'e51933e5-1104-4302-905f-7a7629f5bf02', 'test1', 'PIANO');

insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (11, 1, 'test', 0, 'a7fdca9b-23e1-4533-a3c5-8beeb28fb66b', 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (12, 1, 'test', 1, 'a7fdca9b-23e1-4533-a3c5-8beeb28fb66b', 'test1', 'PIANO');

insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (13, 1, 'test', 0, '721da6c6-cf51-4000-9853-754b2a2ac193', 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (14, 2, 'test', 1, '721da6c6-cf51-4000-9853-754b2a2ac193', 'test1', 'PIANO');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag) values (15, 1, 'test', 0, 'adf231b2-fe97-4034-8517-1c4a0f3ba742', 'test1', 'PIANO');