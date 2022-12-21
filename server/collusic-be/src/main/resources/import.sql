insert into member (member_id, auth_id, email, nickname, role, sns_type) values (1, 'test_auth_id', 'test@collusic.com', 'test_user1', 'USER', 'KAKAO');
insert into member (member_id, auth_id, email, nickname, role, sns_type) values (2, 'test_auth_id2', 'test2@collusic.com', 'test_user2', 'USER', 'KAKAO');

insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (1, 'test project1', 50, 'test_url', '2000-12-01 00:07:21.952693', '2000-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (24, 2, 'test', 0, 1, 'test project1', 'PIANO', '2000-12-01 00:07:21.952693', '2000-12-01 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (2, 'test project2', 50, 'test_url', '2001-12-01 00:07:21.952693', '2001-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (1, 1, 'test', 0, 2, 'test project2', 'PIANO', '2001-12-01 00:07:21.952693', '2001-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (2, 1, 'test', 1, 2, 'test1', 'PIANO', '2002-12-03 00:07:21.952693', '2002-12-03 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (3, 1, 'test', 2, 2, 'test1', 'PIANO', '2002-12-04 00:07:21.952693', '2002-12-04 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (4, 1, 'test', 3, 2, 'test1', 'PIANO', '2002-12-05 00:07:21.952693', '2002-12-05 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (5, 1, 'test', 4, 2, 'test1', 'PIANO', '2002-12-06 00:07:21.952693', '2002-12-06 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (6, 1, 'test', 5, 2, 'test1', 'PIANO', '2002-12-07 00:07:21.952693', '2002-12-07 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (7, 1, 'test', 6, 2, 'test1', 'PIANO', '2002-12-08 00:07:21.952693', '2002-12-08 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (8, 1, 'test', 7, 2, 'test1', 'PIANO', '2002-12-09 00:07:21.952693', '2002-12-09 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (9, 1, 'test', 8, 2, 'test1', 'PIANO', '2002-12-10 00:07:21.952693', '2002-12-10 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (10, 1, 'test', 9, 2, 'test1', 'PIANO', '2002-12-11 00:07:21.952693', '2002-12-11 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (3, 'test project3', 50, 'test_url', '2002-12-01 00:07:21.952693', '2002-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (11, 1, 'test', 0, 3, 'test project3', 'PIANO', '2002-12-01 00:07:21.952693', '2002-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (12, 1, 'test', 1, 3, 'test1', 'PIANO', '2002-12-02 00:07:21.952693', '2002-12-02 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (4, 'test project4', 50, 'test_url', '2003-12-01 00:07:21.952693', '2003-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (13, 1, 'test', 0, 4, 'test project4', 'PIANO', '2003-12-01 00:07:21.952693', '2003-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (14, 2, 'test', 1, 4, 'test1', 'PIANO', '2003-12-02 00:07:21.952693', '2003-12-02 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (5, 'test project5', 50, 'test_url', '2004-12-01 00:07:21.952693', '2004-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (15, 1, 'test', 0, 5, 'test project5', 'PIANO', '2004-12-01 00:07:21.952693', '2004-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (17, 2, 'test', 1, 5, 'test1', 'PIANO', '2004-12-02 00:07:21.952693', '2004-12-02 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (6, 'test project6', 50, 'test_url', '2005-12-01 00:07:21.952693', '2005-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (25, 2, 'test', 0, 6, 'test project6', 'PIANO', '2005-12-01 00:07:21.952693', '2005-12-01 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (7, 'test project7', 50, 'test_url', '2006-12-01 00:07:21.952693', '2006-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (26, 2, 'test', 0, 7, 'test project7', 'PIANO', '2006-12-01 00:07:21.952693', '2006-12-01 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (8, 'test project8', 50, 'test_url', '2007-12-01 00:07:21.952693', '2007-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (27, 2, 'test', 0, 8, 'test project8', 'PIANO', '2007-12-01 00:07:21.952693', '2007-12-01 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (9, 'test project9', 50, 'test_url', '2008-12-01 00:07:21.952693', '2008-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (28, 2, 'test', 0, 9, 'test project9', 'PIANO', '2008-12-01 00:07:21.952693', '2008-12-01 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (10, 'test project10', 50, 'test_url', '2009-12-01 00:07:21.952693', '2009-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (16, 1, 'test', 0, 10, 'test project10', 'PIANO', '2009-12-01 00:07:21.952693', '2009-12-01 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (11, 'test project11', 50, 'test_url', '2010-12-01 00:07:21.952693', '2010-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (18, 1, 'test', 0, 11, 'test project11', 'PIANO', '2010-12-01 00:07:21.952693', '2010-12-01 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (12, 'test project12', 50, 'test_url', '2011-12-01 00:07:21.952693', '2011-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (29, 2, 'test', 0, 12, 'test project12', 'PIANO', '2011-12-01 00:07:21.952693', '2011-12-01 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (13, 'test project13', 50, 'test_url', '2012-12-01 00:07:21.952693', '2012-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (30, 2, 'test', 0, 13, 'test project13', 'PIANO', '2012-12-01 00:07:21.952693', '2012-12-01 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (14, 'test project14', 50, 'test_url', '2013-12-01 00:07:21.952693', '2013-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (19, 1, 'test', 0, 14, 'test project14', 'PIANO', '2013-12-01 00:07:21.952693', '2013-12-01 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (15, 'test project15', 50, 'test_url', '2014-12-01 00:07:21.952693', '2014-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (21, null, 'test', 0, 15, 'test project15', 'PIANO', '2014-12-01 00:07:21.952693', '2014-12-01 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (16, 'test project16', 50, 'test_url', '2015-12-01 00:07:21.952693', '2015-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (22, 1, 'test', 0, 16, 'test project16', 'PIANO', '2015-12-01 00:07:21.952693', '2015-12-01 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (17, 'test project17', 50, 'test_url', '2016-12-01 00:07:21.952693', '2016-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (23, 2, 'test', 0, 17, 'test project17', 'PIANO', '2016-12-01 00:07:21.952693', '2016-12-01 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (18, 'test project18', 50, 'test_url', '2017-12-01 00:07:21.952693', '2017-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (31, 2, 'test', 0, 13, 'test project18', 'PIANO', '2017-12-01 00:07:21.952693', '2017-12-01 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (19, 'test project19', 50, 'test_url', '2018-12-01 00:07:21.952693', '2018-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (32, 2, 'test', 0, 19, 'test project19', 'PIANO', '2018-12-01 00:07:21.952693', '2018-12-01 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (20, 'test project20', 50, 'test_url', '2019-12-01 00:07:21.952693', '2019-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (33, 2, 'test', 0, 20, 'test project20', 'PIANO', '2019-12-01 00:07:21.952693', '2019-12-01 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (21, 'test project21', 50, 'test_url', '2020-12-01 00:07:21.952693', '2020-12-01 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (34, 2, 'test', 0, 21, 'test project21', 'PIANO', '2020-12-01 00:07:21.952693', '2020-12-01 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (22, 'test project22', 50, 'test_url', '2021-12-02 00:07:21.952693', '2021-12-02 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (35, 2, 'test', 0, 22, 'test project22', 'PIANO', '2021-12-02 00:07:21.952693', '2021-12-02 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (23, 'test project23', 50, 'test_url', '2021-12-03 00:07:21.952693', '2021-12-03 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (36, 2, 'test', 0, 23, 'test project23', 'PIANO', '2021-12-03 00:07:21.952693', '2021-12-03 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (24, 'test project24', 50, 'test_url', '2021-12-04 00:07:21.952693', '2021-12-04 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (37, 2, 'test', 0, 24, 'test project24', 'PIANO', '2021-12-04 00:07:21.952693', '2021-12-04 00:07:21.952693');


insert into project (project_id, project_name, bpm, file_url, created_date, modified_date) values (25, 'test project25', 50, 'test_url', '2021-12-05 00:07:21.952693', '2021-12-05 00:07:21.952693');
insert into track (track_id, creator_id, file_url, order_in_project, project_id, track_name, track_tag, created_date, modified_date) values (38, 2, 'test', 0, 25, 'test project25', 'PIANO', '2021-12-05 00:07:21.952693', '2021-12-05 00:07:21.952693');


insert into project_like(project_like_id, member_id, project_id) values(1, 1, 13);