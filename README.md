## Run Project
### Activate virtual environment
1. Create
```
python3 -m venv myvenv
```
2. Activate
```
source myvenv/bin/activate
```
### Install library
```
pip install -r /path/to/requirements.txt
```

### Download model
First you need to download our model from here: [ViText2Sql Model](https://drive.google.com/drive/folders/1RqdVzsuBgu2yP2w6kbUAUJ9g1NC6qjWb?usp=sharing)
You should save your dowloaded filer inside **'models'** folder at the root of the project. 

### Run
```
cd path/manage.py
python manage.py runserver
```

## UI
When you first open project
![alt text](imgs/first.png)

Make sure you add table that you need to query in
![alt text](imgs/add-table.png)

Make your question and ask our bot
![alt text](imgs/result.png)

----
## Additional infomation
#### [Source training model](https://colab.research.google.com/drive/1V-Dlos__fHR9EYO3AnVbx0ykzIAd2hW-?usp=sharing)
#### [Source dataset](https://github.com/wannabe-pro0001/ViText2Sql_Dataset)