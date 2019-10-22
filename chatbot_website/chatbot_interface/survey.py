from .airtable import Airtable

airtable = Airtable()

class Survey():

    def __init__(self):
        #should really do this in redis
        self.asked_questions_by_session = {}

    def get_next_question_id_for_category(self, session_id, category):
        questions_in_category = [ q['id'] for q in airtable.get_questions_by_category()[category] ]
        asked_questions = self.asked_questions_by_session[session_id]
        unasked_questions = [ q for q in questions_in_category if q not in asked_questions ]
        if len(unasked_questions) == 0:
            self.asked_questions_by_session[session_id] = []
        return unasked_questions[0]

    def get_next_category(self, session_id):
        categories = airtable.get_categories()
        prev_question_id = self.asked_questions_by_session[session_id][-1]
        prev_category = airtable.get_questions_by_id()[prev_question_id]['fields']['Category']
        prev_index = categories.index(prev_category)
        if prev_index + 1 < len(categories):
            return categories[prev_index + 1]
        else:
            return categories[0]

    def get_next_question_id(self, session_id):
        if session_id in self.asked_questions_by_session:
            question_id = self.get_next_question_id_for_category(session_id, self.get_next_category(session_id))
        else:
            self.asked_questions_by_session[session_id] = []
            question_id = self.get_next_question_id_for_category(session_id, airtable.get_categories()[0])
        self.asked_questions_by_session[session_id].append(question_id)
        return question_id

    def get_next_question_text(self, session_id):
        return airtable.get_questions_by_id()[self.get_next_question_id(session_id)]['fields']['Question']
