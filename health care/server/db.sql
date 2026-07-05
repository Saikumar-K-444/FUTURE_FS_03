-- ===========================================
-- SMART HEALTH CARE DATABASE
-- ===========================================

DROP DATABASE IF EXISTS smartcare_db;

CREATE DATABASE smartcare_db;

USE smartcare_db;

-- ===========================================
-- Diseases Table
-- ===========================================

CREATE TABLE diseases (

    id INT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(150) NOT NULL,

    symptoms TEXT NOT NULL,

    medicines TEXT NOT NULL,

    precautions TEXT NOT NULL,

    image_url TEXT NOT NULL

);

-- ===========================================
-- Disease 1
-- జలుబు (Common Cold)
-- ===========================================

INSERT INTO diseases
(name, symptoms, medicines, precautions, image_url)

VALUES(

'జలుబు',

'ముక్కు కారడం, తుమ్ములు, గొంతు నొప్పి, స్వల్ప జ్వరం',

'పారాసిటమాల్, సలైన్ నాసల్ స్ప్రే',

'ఎక్కువ నీరు తాగండి, విశ్రాంతి తీసుకోండి, చేతులు శుభ్రంగా కడుక్కోండి, పోషకాహారం తీసుకోండి',

'https://images.unsplash.com/photo-1584515933487-779824d29309'

);

-- ===========================================
-- Disease 2
-- ఇన్‌ఫ్లుయెంజా (Flu)
-- ===========================================

INSERT INTO diseases
(name, symptoms, medicines, precautions, image_url)

VALUES(

'ఫ్లూ (ఇన్‌ఫ్లుయెంజా)',

'జ్వరం, వణుకు, శరీర నొప్పులు, దగ్గు',

'పారాసిటమాల్',

'బాగా విశ్రాంతి తీసుకోండి, ఎక్కువ ద్రవాలు తాగండి, మాస్క్ ధరించండి',

'https://images.unsplash.com/photo-1576091160550-2173dba999ef'

);

-- ===========================================
-- Disease 3
-- COVID-19
-- ===========================================

INSERT INTO diseases
(name, symptoms, medicines, precautions, image_url)

VALUES(

'కోవిడ్-19',

'జ్వరం, పొడి దగ్గు, గొంతు నొప్పి, అలసట',

'పారాసిటమాల్',

'చేతులు తరచుగా కడుక్కోండి, ఇతరులకు దూరంగా ఉండండి',

'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144'

);

-- ===========================================
-- Disease 4
-- Dengue
-- ===========================================

INSERT INTO diseases
(name, symptoms, medicines, precautions, image_url)

VALUES(

'డెంగ్యూ',

'అధిక జ్వరం, తలనొప్పి, కీళ్ల నొప్పులు, చర్మంపై దద్దుర్లు',

'పారాసిటమాల్',

'దోమల కాటుకు గురికాకుండా ఉండండి, ఎక్కువ నీరు తాగండి',

'https://images.unsplash.com/photo-1505751172876-fa1923c5c528'

);

-- ===========================================
-- Disease 5
-- Malaria
-- ===========================================

INSERT INTO diseases
(name, symptoms, medicines, precautions, image_url)

VALUES(

'మలేరియా',

'జ్వరం, వణుకు, చెమటలు, తలనొప్పి',

'OTC మందులు లేవు',

'దోమతెరలు ఉపయోగించండి, దోమల నివారణ చర్యలు తీసుకోండి',

'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b'

);

-- ===========================================
-- Disease 6
-- Typhoid
-- ===========================================

INSERT INTO diseases
(name, symptoms, medicines, precautions, image_url)

VALUES(

'టైఫాయిడ్',

'అధిక జ్వరం, బలహీనత, కడుపు నొప్పి',

'OTC మందులు లేవు',

'శుభ్రమైన నీరు తాగండి, పరిశుభ్రమైన ఆహారం తీసుకోండి',

'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7'

);



-- ===========================================
-- Disease 7
-- Diarrhea
-- ===========================================

INSERT INTO diseases
(name, symptoms, medicines, precautions, image_url)

VALUES(

'విరేచనాలు',

'విరేచనాలు, కడుపు ముల్లు, డీహైడ్రేషన్',

'ORS',

'ORS తాగండి, ఎక్కువ నీరు తాగండి, శుభ్రమైన ఆహారం తీసుకోండి',

'https://images.unsplash.com/photo-1582750433449-648ed127bb54'

);

-- ===========================================
-- Disease 8
-- Food Poisoning
-- ===========================================

INSERT INTO diseases
(name, symptoms, medicines, precautions, image_url)

VALUES(

'ఆహార విషబాధ',

'వాంతులు, విరేచనాలు, కడుపు నొప్పి',

'ORS',

'ఎక్కువ ద్రవాలు తాగండి, పరిశుభ్రత పాటించండి',

'https://images.unsplash.com/photo-1504813184591-01572f98c85f'

);

-- ===========================================
-- Disease 9
-- Diabetes
-- ===========================================

INSERT INTO diseases
(name, symptoms, medicines, precautions, image_url)

VALUES(

'మధుమేహం',

'తరచుగా మూత్ర విసర్జన, అధిక దాహం, అలసట',

'OTC మందులు లేవు',

'సమతుల ఆహారం తీసుకోండి, రక్తంలో చక్కెరను తరచుగా పరీక్షించండి',

'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d'

);

-- ===========================================
-- Disease 10
-- High Blood Pressure
-- ===========================================

INSERT INTO diseases
(name, symptoms, medicines, precautions, image_url)

VALUES(

'అధిక రక్తపోటు',

'సాధారణంగా లక్షణాలు ఉండవు, తలనొప్పి',

'OTC మందులు లేవు',

'ఉప్పు తగ్గించండి, ప్రతిరోజూ వ్యాయామం చేయండి',

'https://images.unsplash.com/photo-1579154204601-01588f351e67'

);

-- ===========================================
-- Disease 11
-- Asthma
-- ===========================================

INSERT INTO diseases
(name, symptoms, medicines, precautions, image_url)

VALUES(

'ఆస్తమా',

'పిల్లికూతలు, శ్వాస తీసుకోవడంలో ఇబ్బంది, దగ్గు',

'OTC మందులు లేవు',

'దుమ్ము మరియు పొగకు దూరంగా ఉండండి, ఇన్హేలర్ ఉపయోగించండి',

'https://images.unsplash.com/photo-1580281657527-47f249e8f4df'

);

-- ===========================================
-- Disease 12
-- Pneumonia
-- ===========================================

INSERT INTO diseases
(name, symptoms, medicines, precautions, image_url)

VALUES(

'న్యూమోనియా',

'జ్వరం, ఛాతీ నొప్పి, దగ్గు, శ్వాస తీసుకోవడంలో ఇబ్బంది',

'OTC మందులు లేవు',

'బాగా విశ్రాంతి తీసుకోండి, వెంటనే వైద్యుడిని సంప్రదించండి',

'https://images.unsplash.com/photo-1516549655169-df83a0774514'

);



-- ===========================================
-- Disease 13
-- Skin Allergy
-- ===========================================

INSERT INTO diseases
(name, symptoms, medicines, precautions, image_url)

VALUES(

'చర్మ అలెర్జీ',

'దురద, ఎర్రబడటం, దద్దుర్లు',

'కాలమైన్ లోషన్',

'అలెర్జీ కలిగించే పదార్థాలకు దూరంగా ఉండండి, చర్మాన్ని శుభ్రంగా ఉంచండి',

'https://images.unsplash.com/photo-1584515933487-779824d29309'

);

-- ===========================================
-- Disease 14
-- Eye Infection
-- ===========================================

INSERT INTO diseases
(name, symptoms, medicines, precautions, image_url)

VALUES(

'కంటి ఇన్ఫెక్షన్',

'కంటి ఎర్రబడటం, దురద, నీరు కారడం',

'ఆర్టిఫిషియల్ టియర్స్',

'చేతులు శుభ్రంగా కడుక్కోండి, కళ్లను రుద్దకండి',

'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'

);

-- ===========================================
-- Disease 15
-- Ear Infection
-- ===========================================

INSERT INTO diseases
(name, symptoms, medicines, precautions, image_url)

VALUES(

'చెవి ఇన్ఫెక్షన్',

'చెవి నొప్పి, వినికిడి తగ్గడం, జ్వరం',

'పారాసిటమాల్',

'చెవిని పొడిగా ఉంచండి, చెవిలో వస్తువులు పెట్టకండి',

'https://images.unsplash.com/photo-1576091160550-2173dba999ef'

);

-- ===========================================
-- Disease 16
-- Minor Cuts & Wounds
-- ===========================================

INSERT INTO diseases
(name, symptoms, medicines, precautions, image_url)

VALUES(

'చిన్న గాయాలు',

'చిన్న కోతలు, గీతలు',

'పోవిడోన్ అయోడిన్',

'గాయాన్ని శుభ్రం చేయండి, కట్టు కట్టండి',

'https://images.unsplash.com/photo-1584516150909-c43483ee7938'

);

-- ===========================================
-- Disease 17
-- Mild Heartburn
-- ===========================================

INSERT INTO diseases
(name, symptoms, medicines, precautions, image_url)

VALUES(

'గుండెల్లో మంట',

'ఛాతీలో మంట, యాసిడ్ రిఫ్లక్స్',

'కాల్షియం కార్బోనేట్',

'కారం తక్కువ తినండి, తిన్న వెంటనే పడుకోకండి',

'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d'

);

-- ===========================================
-- Disease 18
-- Migraine
-- ===========================================

INSERT INTO diseases
(name, symptoms, medicines, precautions, image_url)

VALUES(

'మైగ్రేన్',

'తీవ్రమైన తలనొప్పి, వాంతులు, కాంతి భరించలేకపోవడం',

'పారాసిటమాల్',

'తగినంత నిద్రపోండి, ఒత్తిడిని తగ్గించండి, ఎక్కువ నీరు తాగండి',

'https://images.unsplash.com/photo-1538108149393-fbbd81895907'

);

-- ===========================================
-- DATABASE COMPLETED SUCCESSFULLY
-- SMART HEALTH CARE
-- Total Diseases : 18
-- ===========================================