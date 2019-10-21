QUESTIONS_URL = "https://api.airtable.com/v0/appcWlmxcIiheyPfS/Survey%20Questions?view=Grid%20view"
RESPONSES_URL = "https://api.airtable.com/v0/appcWlmxcIiheyPfS/Responses"
import requests
import os

authorization = { 'Authorization': 'Bearer %s' % os.environ['AIRTABLE_API_KEY'] }

class Reporting():
    questions_by_category = {}
    questions_by_id = {}
    def get_questions(self):
        response = requests.get(QUESTIONS_URL, headers=authorization)
        records = response.json()['records']
        if records and len(records) > 0:
            for record in records:
                category = record['fields']['Category']
                if category not in self.questions_by_category:
                    self.questions_by_category[category] = []
                self.questions_by_category[category].append(record)
                self.questions_by_id[record['id']] = record['fields']['Question']

    def get_id_by_question(self, question):
        for id in self.questions_by_id:
            if self.questions_by_id[id] == question:
                return id

    def report(self, response):
        if len(self.questions_by_category.keys()) == 0:
            self.get_questions()
        hasQuestion = 'respondingTo' in response
        question_id = self.get_id_by_question(response['respondingTo']) if hasQuestion else None
        question_text = response['respondingTo'] if hasQuestion else None
        data = {
            'records': [
                {
                    'fields': {
                        'Question': question_id,
                        'Question Text': question_text,
                        'Response': response['message']
                    }
                }
            ]
        }
        requests.post(RESPONSES_URL, json=data, headers=authorization)
