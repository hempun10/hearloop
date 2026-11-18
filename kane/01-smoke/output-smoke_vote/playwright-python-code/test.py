import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="4d39e528-0473-48fe-bf21-b0ec408a2eed",
    name="Vote on First Request",
    tc_id="TC-30",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"first_request_vote_button_highlighted_voted": "true", "first_request_vote_button_accessible_label": "voted"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/acme', instruction_id='0856ffa8-e5a5-4768-81d2-71a93677804d'):
        variable_value_0 = var('{{global.base_url}}/acme')
        await page.goto(variable_value_0)
    
    async with testmu.step('Clicking the vote button on the first request', instruction_id='05413c70-f507-4701-80d8-d0a845800eca'):
        _loc_1 = page.locator("internal:role=button[name=\"13 votes, vote\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Checking whether the first request vote button is highlighted as voted'):
        set_var('first_request_vote_button_highlighted_voted', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {20: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(20).getAttribute('aria-pressed') === 'true');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=button[name="votes, voted"i]'], query='whether the vote button on the first request in the Requests list is highlighted as voted', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='The vote button on the first request is highlighted as voted.'))
    
    async with testmu.step('Reading the first request vote button accessible label ending'):
        set_var('first_request_vote_button_accessible_label', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {20: 0};\n  const el = (i) => els[__m[i]];\n  const __v = ((el(20).getAttribute('aria-label') || '').trim().split(/\\s+/).pop());\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=button[name="votes, voted"i]'], query='the final word of the accessible label on the vote button for the first request in the Requests list', expected_value='voted', needs_unit_conversion=False, operator='equals', transforms=['lowercase'], condition="The accessible label of the vote button on the first request ends with 'voted'."))
    
    async with testmu.step('Assertion check', instruction_id='ef51a0c1-a288-4a09-a41a-1dc7788bd1cb'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': 'The vote button on the first request is highlighted as voted.', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{first_request_vote_button_highlighted_voted}}', 'store_key': 'first_request_vote_button_highlighted_voted', 'variable_refs': {'{{first_request_vote_button_highlighted_voted}}': 'true'}}, {'description': "The accessible label of the vote button on the first request ends with 'voted'.", 'passed': True, 'operator': 'equals', 'transforms': ['lowercase'], 'json_path': None, 'expected': 'voted', 'extracted_value': '{{first_request_vote_button_accessible_label}}', 'store_key': 'first_request_vote_button_accessible_label', 'variable_refs': {'{{first_request_vote_button_accessible_label}}': 'voted'}}], 'sub_checks': [{'description': 'The vote button on the first request is highlighted as voted.', 'store_key': 'first_request_vote_button_highlighted_voted', 'expected_value': 'true', 'extracted_value': '{{first_request_vote_button_highlighted_voted}}', 'operator': 'equals', 'transforms': []}, {'description': "The accessible label of the vote button on the first request ends with 'voted'.", 'store_key': 'first_request_vote_button_accessible_label', 'expected_value': 'voted', 'extracted_value': '{{first_request_vote_button_accessible_label}}', 'operator': 'equals', 'transforms': ['lowercase']}], 'composite_operator': 'and', 'claim': "the button is now highlighted as voted and its accessible label ends with 'voted'."})


if __name__ == "__main__":
    testmu.run(test)