
from .airtable import Airtable

airtable = Airtable();

class Reporting():
    def get_id_by_question(self, question):
        questions_by_id = airtable.get_questions_by_id()
        for id in questions_by_id:
            if questions_by_id[id] == question:
                return id

    def report(self, response):
        hasQuestion = 'respondingTo' in response
        question_id = self.get_id_by_question(response['respondingTo']) if hasQuestion else None
        question_text = response['respondingTo'] if hasQuestion else None
        airtable.report_response({
            'Question': question_id,
            'Question Text': question_text,
            'Response': response['message']
        })
