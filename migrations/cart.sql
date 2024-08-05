DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS orders;

CREATE TABLE IF NOT EXISTS roles (id INTEGER PRIMARY KEY, access VARCHAR(10), createdAt DATETIME, updatedAt DATETIME);
INSERT INTO roles (id, access, createdAt, updatedAt) VALUES (1, 'user', '2023-11-10 18:09:14.000', '2023-11-10 18:09:14.000');
INSERT INTO roles (id, access, createdAt, updatedAt) VALUES (2, 'admin', '2023-11-10 18:09:14.000', '2023-11-10 18:09:14.000');

CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, userId VARCHAR(64), username VARCHAR(128) UNIQUE NOT NULL, email VARCHAR(128) UNIQUE NOT NULL, password VARCHAR(128) NOT NULL, salt VARCHAR(128) NOT NULL, isAdmin TYNYINT(1), createdAt DATETIME, updatedAt DATETIME);
INSERT INTO users (id, userId, username, email, password, salt, isAdmin, createdAt, updatedAt) VALUES (1, '0296d4a5aef43927e9e4ca1914dc4cd0', 'Martin', 'a@example.com', 'bda7ffbf55894f804e4db5e6557434159dfc8131313fc72324cee18a9b26e3faa07e4a047e7eda6622fa7c85ed0c4d77e493da045b2a963009d7b86bd607998f', '0eMKFvCkOdxnR8+ll+eJ8xdrNqa8TpIiWHsxWJyJ4qx1mZHJMuf7MhWYMbur4gTQ7jJ0NKmlS4n4XHDyWOVTyXJ7naA5/4VmMJmwsyy1+54X6lno1AUQeMAMX6zQ/wpKSq0JJpW3B5y/hJDqItB5IUvJvZ4ErlRlR5cgVVLyXDw=', 1, '2023-11-10 18:11:57.000', '2023-11-10 18:11:57.000'), 
(2, 'cf08ec2afb6a3de1b8c13ff807a74f85', 'Kimberley', 'b@example.com', '5237055c17db4a98870c085c4910bb5926f90616eb787577c75661baf45f6595b0bfb7eff92b84f68f66dbe1af50166966493a3eab20b3d07c8511ddd10cf156', 'YlbrFFobHPtcSWG0MVj6/0asT7qZK1Y5utofLbnJC/3c1DqdSJXUxykbx1xLIaFTBD4G8AbyMr8iacJ5StiGHhVzyGUEL4jT8yJINXFOG+O11nDnkYA3tVcad3sk81D4rmAXgkvXKXRRMksvYpc8NfGJ32urKmkqX8At8NBzUAw=', 0, '2023-11-10 18:13:16.000', '2023-11-10 18:13:16.000');

CREATE TABLE IF NOT EXISTS user_roles (roleId INTEGER PRIMARY KEY, userId INTEGER, createdAt DATETIME, updatedAt DATETIME, 
FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE);
INSERT INTO user_roles (roleId, userId, createdAt, updatedAt) VALUES (1, 1, '2023-11-10 18:13:16.000', '2023-11-10 18:13:16.000'), 
(2, 2, '2023-11-10 18:11:57.000', '2023-11-10 18:11:57.000');

CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, gtin VARCHAR(64) UNIQUE NOT NULL, category VARCHAR(64), type VARCHAR(64),
title VARCHAR(128), image VARCHAR(1024), creator VARCHAR(64), description VARCHAR(4096) DEFAULT 'None' NOT NULL,
release_date VARCHAR(16), language VARCHAR(64) DEFAULT 'None', publisher VARCHAR(64) DEFAULT 'None', stock SMALLINT DEFAULT 0 NOT NULL, ratings FLOAT(10) DEFAULT 0, listprice INTEGER NOT NULL, 
discount INTEGER DEFAULT 0 NOT NULL, popularItem TINYINT(1) DEFAULT 0 NOT NULL, comments INTEGER DEFAULT 0 NOT NULL,
createdAt DATETIME, updatedAt DATETIME);
INSERT INTO `products` VALUES
(1,'978-0241316757','Books','Politics','Origins Of Totalitarianism','https://m.media-amazon.com/images/I/81JZJ0elZ1L._SL1500_.jpg','Hannah Arendt','The Origins of Totalitarianism begins with the rise of anti-Semitism in central and western Europe in the 1800s and continues with an examination of European colonial imperialism from 1884 to the outbreak of World War I. Arendt explores the institutions and operations of totalitarian movements, focusing on the two genuine forms of totalitarian government in our time—Nazi Germany and Stalinist Russia—which she adroitly recognizes were two sides of the same coin, rather than opposing philosophies of Right and Left. From this vantage point, she discusses the evolution of classes into masses, the role of propaganda in dealing with the nontotalitarian world, the use of terror, and the nature of isolation and loneliness as preconditions for total domination.','2017-01-01', 'English', 'Penguin Modern Classics',20,4.6,485,0,0,701,'2023-10-12 20:40:50','2023-10-12 20:40:50'),
(2,'978-0545162074','Books','Fiction','Harry Potter Paperback Box Set (Books 1-7)','https://m.media-amazon.com/images/I/51v0gkGIaKL._SL1200_.jpg','J. K. Rowling','Now for the first time ever, J.K. Rowling’s seven bestselling Harry Potter books are available in a stunning paperback boxed set! The Harry Potter series has been hailed as “one for the ages” by Stephen King and “a spellbinding saga’ by USA Today. And most recently, The New York Times called Harry Potter and the Deathly Hallows the “fastest selling book in history.” This is the ultimate Harry Potter collection for Harry Potter fans of all ages!','2009-07-01','English', 'Scholastic Inc.',37,4.9,3710,20,0,11034,'2023-10-12 20:49:30','2023-11-10 16:31:12'),
(3,'978-1119796763','Books','ComputerScience','Artificial Intelligence For Dummies','https://m.media-amazon.com/images/I/81KieAp28yL._SL1500_.jpg','John Paul Mueller','Every time you use a smart device or some sort of slick technology―be it a smartwatch, smart speaker, security alarm, or even customer service chat box―you’re engaging with artificial intelligence (AI). If you’re curious about how AI is developed―or question whether AI is real―Artificial Intelligence For Dummies holds the answers you’re looking for. Starting with a basic definition of AI and explanations of data use, algorithms, special hardware, and more, this reference simplifies this complex topic for anyone who wants to understand what operates the devices we can’t live without.','2021-11-24','English','For Dummies',40,4.1,950,5,0,45,'2023-10-12 20:57:05','2023-10-18 11:15:43'),
(4,'883929704736','Videos','Blu-ray','The Lord of the Rings: The Motion Picture Trilogy (Extended & Theatrical)(4K Ultra HD + Digital)','https://m.media-amazon.com/images/I/71h7HHb9lIL._SL1500_.jpg',NULL,'This critically acclaimed epic trilogy follows the quest undertaken by the hobbit, Frodo Baggins, and his fellowship of companions to save Middle-earth by destroying the One Ring and defeating the evil forces of the Dark Lord Sauron.','2020-12-01','English','Warner Bros',10,4.8,3800,20,0,37000,'2023-10-12 21:17:39','2023-11-02 22:04:06'),
(5,'LGT46573BR','Videos','Blu-ray','John Wick','https://m.media-amazon.com/images/I/71TPtV8DDVL._SL1393_.jpg',NULL,'When sadistic young thugs senselessly attack John Wick - a brilliantly lethal ex-assassin - they have no idea that they have just awakened the boogeyman. With New York City as his bullet-riddled playground, Wick embarks on a merciless rampage, hunting down his adversaries with the skill and ruthlessness that made him an underworld legend.','2017-02-07','English(Dub), Subtitles:English, Spanish','Lionsgate Home Entertainment',40,4.8,660,0,0,105381,'2023-10-12 22:01:26','2023-10-18 11:47:37'),
(6,'B06XXCTXX1','Videos','Blu-ray','John Wick: Chapter 2 - 4K Ultra Hd [Blu-ray] [4K UHD]','https://m.media-amazon.com/images/I/71UmgeXe96L._SL1500_.jpg',NULL,'John Wick is forced out of retirement, and this time, he must face off against a shadowy international assassin′s guild and more of the world′s deadliest killers.','2017-06-13','English, Subtitles:Spanish, English','Lions Gate Home Entertainment',3,4.8,660,0,0,17316,'2023-10-13 16:33:18','2023-10-18 11:47:49'),
(7,'B07QN8PDKL','Videos','Blu-ray','John Wick: Chapter 3 – Parabellum [Blu-ray]','https://m.media-amazon.com/images/I/81hIplQ7rQL._SL1500_.jpg',NULL,'Super assassin John Wick is on the run after killing a member of the international assassin′s guild, and with a $14 million price tag on his head he is the target of hit men and women everywhere.','2019-09-10','English, Subtitles:Spanish, English','Lionsgate',12,4.8,480,0,0,21000,'2023-10-13 16:37:08','2023-10-18 11:48:04'),
(8,'B0BZ5C5XNJ','Videos','Blu-ray','John Wick: Chapter 4 [Blu-ray]','https://m.media-amazon.com/images/I/81J1DaRKzUL._SL1500_.jpg',NULL,'Super assassin John Wick is on the run after killing a member of the international assassin′s guild, and with a $14 million price tag on his head he is the target of hit men and women everywhere.','2023-06-09','English, Subtitles:English','Lionsgate Home Entertainment',12,4.6,660,0,0,40319,'2023-10-13 16:41:00','2023-11-05 13:35:18'),
(9,'4710756122456','Videos','Blu-ray','Dungeons & Dragons: Honor Among Thieves (BD)','https://m.media-amazon.com/images/I/813oHCxIbfL._SL1500_.jpg',NULL,'A charming thief and a band of unlikely adventurers embark on an epic quest to retrieve a lost relic, but things go dangerously awry when they run afoul of the wrong people.','2023-05-30','English, Spanish, French ; Subtitles:English','PARAMOUNT',42,4.4,960,0,1,18973,'2023-10-19 19:04:39','2023-10-19 19:04:39'),
(10,'9789861755267','Books','Psychology','原子習慣','https://s.eslite.com/upload/product/o/2681759319001/ec1760858.jpg','詹姆斯．克利爾','假如你也正想著擺脫自己偷懶的惡習、邁向更理想的人生，不妨跟著編輯讀《原子習慣》，從下列筆記三大點，快速瀏覽暢銷書《原子習慣》有效實踐的秘密！','2019-06-01','繁體中文','方智出版社股份有限公司',19,4.1,330,20,1,50731,'2023-10-19 19:25:48','2023-10-19 19:25:48'),
(11,'978-0358439196','Books','Fiction','The Lord of the Rings 3-Book Paperback Box Set','https://m.media-amazon.com/images/I/61cP8-CI40L._SL1500_.jpg','J.R.R. Tolkien','Tolkien’s The Lord of the Rings continues to seize the imaginations of readers of all ages, and this three-volume paperback edition is designed to appeal to all. This three-book paperback set is a perfect way to share the pleasures of Tolkien’s peerless fantasy.','2020-11-03','English','Clarion Books',109,4.8,1050,45,1,8736,'2023-11-05 08:18:05','2023-11-05 08:18:05'),
(12,'B0CP349RP1','Games','RPG','Dragon′s Dogma 2','https://m.media-amazon.com/images/I/81MRV8O8QML._AC_UY327_FMwebp_QL65_.jpg',NULL,'A Grand Adventure – Dragon’s Dogma 2 begins in a subterranean jail, where the Dragon’s voice echoes in the fog of lost memories.','2024-03-22','English','Capcom',237,3.1,1050,0,0,10,'2024-03-22 09:11:00','2024-03-24 11:18:35'),
(13,'B0CJHD3JZ8','Games','RPG','Like a Dragon: Infinite Wealth - PlayStation 5','https://m.media-amazon.com/images/I/81E7xMJqe4L._AC_UY327_FMwebp_QL65_.jpg',NULL,'Two larger-than-life heroes brought together by the hand of fate, or perhaps something more sinister…Ichiban Kasuga, an unstoppable underdog who’s no stranger to crawling up from rock bottom, and Kazuma Kiryu, a broken man facing down his last days.','2023-09-21','English','SEGA',201,4.5,915,0,0,1910,'2023-09-21 19:17:00','2024-03-24 11:20:31'),
(14,'B07N2YX52S','Games','Horror fiction','Resident Evil 2 Remake PS4','https://m.media-amazon.com/images/I/81N0cxaqEYL._AC_UY327_FMwebp_QL65_.jpg',NULL,'The genre-defining masterpiece Resident Evil 2 returns, completely rebuilt from the ground up for a deeper narrative experience. Using Capcom proprietary RE engine, Resident Evil 2 offers a fresh take on the classic survival horror saga with breathtakingly realistic visuals, heart-poundingly immersive audio, a new over-the-shoulder camera, and modernized controls on top of gameplay modes from the original game. The nightmares return reimagined for the PlayStation4, Xbox One and PC. In Resident Evil 2, the classic action, tense exploration, and puzzle solving gameplay that defined the Resident Evil series returns. Players join rookie police officer Leon Kennedy and college student Claire Redfield, who are thrust together by a disastrous outbreak in Raccoon City that transformed its population into deadly zombies. Both Leon and Claire have their own separate playable campaigns, allowing players to see the story from both characters′ Perspectives. The fate of these two fan favourite characters is in players hands as they work together to survive and get to the bottom of what is behind the terrifying attack on the city. Will they make it out alive?.','2019-01-25','English','Capcom',101,4.7,720,0,0,1625,'2019-01-25 20:09:03','2019-01-26 10:20:31'),
(15,'B086YVL1CS','Games','Horror fiction','Resident Evil 3: Remake PS4','https://m.media-amazon.com/images/I/61CWrsUbEML._AC_UY327_FMwebp_QL65_.jpg',NULL,'Resident Evil 3 is set amidst the nightmarish outbreak of the t-virus, a biological weapon developed by the pharmaceutical company umbrella Corporation. The game marks the debut of nemesis - a towering humanoid Bio weapon designed for both brutality and high-functioning intelligence - whose dogged hunt of S.T.A.R.S. Member Jill Valentine made him an icon of the Resident Evil series. Armed with an arsenal of high-powered weaponry and wrapped in a black suit to hide his mutilated features, nemesis will maim, pulverize or destroy any obstacle on the path to his target.','2020-04-03','English','Capcom',131,4.7,780,0,0,1779,'2020-04-03 07:04:04','2020-04-04 07:20:31'),
(16,'B0BJTKYLCB','Games','Horror fiction','Resident Evil 4: Remake - PS5','https://m.media-amazon.com/images/I/712XPl7+qKL._AC_UY327_FMwebp_QL65_.jpg',NULL,'Resident Evil 4 joins Leon S. Kennedy six years after his hellish experiences in the biological disaster of Raccoon City. His unmatched resolve caused him to be recruited as an agent reporting directly to the president of the United States. With the experience of multiple missions on his back, Leon is dispatched to rescue the president’s recently kidnapped daughter. Leon tracks her to a secluded European village, however after making first contact he discovers a fervor beyond reason grips the local populace.','2023-03-24','English','Capcom',301,4.8,1800,10,1,1523,'2023-03-24 08:04:04','2023-03-24 09:20:31'),
(17,'B0CPWK93JP','Toys','Figure','World of Warcraft Deluxe Collector Figure: The Lich King: Arthas Menethil','https://m.media-amazon.com/images/I/41-CwutFKHL._AC_UL480_FMwebp_QL65_.jpg',NULL,'Product description The Lich King joins the World of Warcraft line as a Deluxe Collector Figure .
The Lich King stands nearly 9" tall by 10" wide, standing with sword extended ready for battle! Window-box packaging.
World of Warcraft is the massively multiplayer online role-playing game with over 11.5 million devoted subscribers, and its characters are captured in The Lich King: stands 8.5” h x 10”w.','2020-04-01','None','mttdxnh',5,4.0,1380,0,0,0,'2022-06-19 18:04:34','2023-03-17 11:20:01'),
(18,'B09NQ1Y627','Toys','Figure','World of Warcraft ForsakenQueen Sylvanas Windrunner ActionFigure','https://m.media-amazon.com/images/I/41JtMTdTNWL._AC_UL320_.jpg',NULL,'Figurines from China, Modified version, Different from other versions. This product is made of PVC. ','2020-04-01','None','mttdxnh',10,4.3,1300,0,0,10,'2022-06-19 18:04:34','2023-03-17 11:20:01'),
(19,'B08XR74D8F','Games','RPG','Final Fantasy VII Remake INTERGRADE - PS5','https://m.media-amazon.com/images/I/810ufTWNvGS._AC_UY218_.jpg',NULL,'FINAL FANTASY VII REMAKE INTERGRADE is an enhanced and expanded version of the critically acclaimed and award-winning FINAL FANTASY VII REMAKE for PlayStation 5. FINAL FANTASY VII REMAKE INTERGRADE comes bundled with FF7R EPISODE INTERmission featuring Yuffie as the main character which introduces an exhilarating new story arc, and numerous gameplay additions for players to enjoy.','2021-02-25','English','SQUARE ENIX CO. LTD.',10,4.3,1300,0,0,10,'2021-02-25 09:07:30','2024-03-24 11:20:01'),
(20,'B01M6XZINS','Games','Horror fiction','Resident Evil 5 (PS4)','https://m.media-amazon.com/images/I/81VfjgIL6ZL._AC_UY218_.jpg',NULL,'Resident Evil 5 HD PS4','2016-12-20','English','Capcom',15,4.6,630,0,0,904,'2016-12-21 09:07:30','2020-03-24 17:20:01'),
(21,'B01M6578D4','Games','Horror fiction','Resident Evil 6 (PS4)','https://m.media-amazon.com/images/I/71DXByUs16L._AC_UY218_.jpg',NULL,'Blending action and survival horror, Resident Evil 6 delivers an epic dramatic horror experience. Resident Evil favorites Leon S. Kennedy, Chris Redfield and Ada Wong are joined by new characters, including Jake Muller, to face a new horror, the highly virulent C-virus, as the narrative moves between North America, the war-torn Eastern European state of Edonia and the Chinese city of Lanshiang. Resident Evil 6 HD Remastered is European version(PAL)','2016-11-20','English','Capcom',18,4.6,690,0,0,1604,'2016-11-20 09:07:30','2020-03-24 17:20:01'),
(22,'B08TYCWK3C','Games','Horror fiction','Resident Evil Village - PlayStation 5 Standard Edition','https://m.media-amazon.com/images/I/719jVfzuf+L._AC_UY218_.jpg',NULL,'Experience survival horror like never before in Resident Evil village. Elevate each desperate fight to survive by showcasing the most realistic and terrifying graphics to date. The all-new title is the eighth major installment in the storied Resident Evil franchise, which established the survival horror genre nearly 25 years ago. The title is currently in development using Capcom proprietary Re engine, used to create vivid gameplay experiences in hit titles such as Resident Evil 7 biohazard, Resident Evil 2, Resident Evil 3, and Devil May Cry 5. With hyper-detailed graphics, intense first-person action and masterful storytelling, the terror has never felt more realistic and inescapable. Set a few years after the horrifying events in the critically acclaimed Resident Evil 7 biohazard, the all-new storyline begins with Ethan winters and his wife mia living peacefully in a new location, free from their past nightmares. Just as they are building their new life together, tragedy befalls them once again. Chris Redfield, the legendary hero from the Resident Evil series, is reacquainted with the couple and horribly disrupts their life, spiraling Ethan into chaos. A devastated Ethan finds himself in a remote snow-capped village seeking answers after being thrown into an entirely new nightmare.','2021-05-07','English','Capcom',9,4.7,690,0,0,2134,'2021-05-07 14:07:30','2021-05-07 16:07:30'),
(23,'B09743F8P1','Games','RPG','Elden Ring - PlayStation 5','https://m.media-amazon.com/images/I/81h2WhI4dtL._AC_UY327_FMwebp_QL65_.jpg',NULL,'The Golden Order has been broken. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. ELDEN RING, developed by FromSoftware Inc. and produced by BANDAI NAMCO Entertainment Inc., is a fantasy action-RPG and FromSoftware’s largest game to date, set within a world full of mystery and peril. A NEW FANTASY WORLD - Journey through the Lands Between, a new fantasy world created by Hidetaka Miyazaki, creator of the influential DARK SOULS video game series, and George R. R. Martin, author of The New York Times best-selling fantasy series, A Song of Ice and Fire. Unravel the mysteries of the Elden Ring’s power. Encounter adversaries with profound backgrounds, characters with their own unique motivations for helping or hindering your progress, and fearsome creatures. WORLD EXPLORATION IN THE LANDS BETWEEN - ELDEN RING features vast fantastical landscapes and shadowy, complex dungeons that are connected seamlessly. Traverse the breathtaking world on foot or on horseback, alone or online with other players, and fully immerse yourself in the grassy plains, suffocating swamps, spiraling mountains, foreboding castles and other sites of grandeur on a scale never seen before in a FromSoftware title.','2021-06-10','English','Bandai Namco',107,4.7,3160,0,1,7635,'2021-06-10 19:07:31','2021-06-11 11:10:03'),
(24,'979-8333225801','Books','Fiction','Once Human Complete Game Guide: Walkthrough, how to Play, Tips, and Strategies','https://m.media-amazon.com/images/I/61YeHBgalWL._AC_UY327_FMwebp_QL65_.jpg','Osman Holmberg','With the help of this thorough game guide, explore the exciting world of "Once Human" to the fullest extent possible! Regardless of your level of experience, "Once Human Complete Game Guide" is the guide for learning every facet of the game.','2024-07-15','English','Independently published',5,4.0,667,0,0,11,'2024-07-15 11:13:11','2024-07-16 13:45:07'),
(25,'B0CMC3C3Z4','Games','RPG','Silent Hill 2 (PS5)','https://m.media-amazon.com/images/I/71E3B-85r1L._AC_UY327_FMwebp_QL65_.jpg',NULL,'In your restless dreams, do you see that town? SILENT HILL 2 is coming exclusively to PlayStation 5. Produced by KONAMI and developed by Bloober Team in collaboration with Akira Yamaoka and Masahiro Ito, the unsettling town shrouded in the brooding fog will be remade with enhanced visuals, sounds and gameplay. The SILENT HILL 2 remake revisits main protagonist James Sunderland and his search for clues in the namesake town, after receiving a mysterious letter from his wife Mary… who has long been dead. Experience the eerie monsters and other manifestations of James’consciousness reworked after 20 years using state-of-the-art technology to play on modern entertainment systems in 4K.','2024-10-08','English','Konami',0,4.0,2130,0,1,7645,'2024-07-25 14:07:31','2024-07-25 14:07:31');

CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, userId VARCHAR(64) NOT NULL DEFAULT 'None', 
orderId VARCHAR(64) NOT NULL DEFAULT 'None', purchaseItem TEXT, totalprice INTEGER DEFAULT 0, 
status VARCHAR(64) NOT NULL DEFAULT 'Pending', options TEXT, note VARCHAR(1024) NOT NULL DEFAULT 'None', createdAt DATETIME, updatedAt DATETIME);
