
from .airtable import Airtable

airtable = Airtable();

class Reporting():
    batched_responses = []
    def get_id_by_question(self, question):
        questions_by_id = airtable.get_questions_by_id()
        for id in questions_by_id:
            if questions_by_id[id]['fields']['Question'] == question:
                return id

    def send(self):
        airtable.report_responses(self.batched_responses)
        self.batched_responses = []

    def report(self, response):
        hasQuestion = 'respondingTo' in response
        question_id = self.get_id_by_question(response['respondingTo']) if hasQuestion else None
        question_text = response['respondingTo'] if hasQuestion else None
        self.batched_responses.append({
            'Question': [ question_id ] if question_id else None,
            'Question Text': question_text,
            'Response': response['message'],
            'Session ID': response['session']
        })
        if len(self.batched_responses) >= 10:
            self.send()
