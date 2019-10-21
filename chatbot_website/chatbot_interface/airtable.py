import requests
import os

QUESTIONS_URL = "https://api.airtable.com/v0/appcWlmxcIiheyPfS/Survey%20Questions?view=Grid%20view"
RESPONSES_URL = "https://api.airtable.com/v0/appcWlmxcIiheyPfS/Responses"
authorization = { 'Authorization': 'Bearer %s' % os.environ['AIRTABLE_API_KEY'] }

class Airtable():
    questions_by_category = None
    questions_by_id = None
    def get_questions(self):
        response = requests.get(QUESTIONS_URL, headers=authorization)
        records = response.json()['records']
        if records and len(records) > 0:
            self.questions_by_category = {}
            self.questions_by_id = {}
            for record in records:
                category = record['fields']['Category']
                if category not in self.questions_by_category:
                    self.questions_by_category[category] = []
                self.questions_by_category[category].append(record)
                self.questions_by_id[record['id']] = record['fields']['Question']

    def get_questions_by_id(self):
        if self.questions_by_id == None:
            self.get_questions()
        return self.questions_by_id

    def get_questions_by_category(self):
        if self.questions_by_category == None:
            self.get_questions()
        return self.questions_by_category

    def report_response(self, fields):
        data = {
            'records': [
                {
                    'fields': fields
                }
            ]
        }
        requests.post(RESPONSES_URL, json=data, headers=authorization)
