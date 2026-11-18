import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="0005e836-9765-4c22-93fa-3aa43c65d03e",
    name="Access Live Demo Feedback Board",
    tc_id="TC-10",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"feedback_that_ships_itself_headline_visible": "true", "post_idea_button_loaded": "true", "feedback_board_loaded": "true", "requests_list_loaded": "true"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/', instruction_id='a56bc178-2e2b-4126-9ef5-29b791267f2a'):
        variable_value_0 = var('{{global.base_url}}/')
        await page.goto(variable_value_0)
    
    async with testmu.step('Checking whether the feedback headline is present'):
        set_var('feedback_that_ships_itself_headline_visible', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {11: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(11).textContent.includes('Feedback that ships itself.') && !!(el(11).offsetWidth || el(11).offsetHeight || el(11).getClientRects().length));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="Feedback that ships itself."i]'], query="whether the headline 'Feedback that ships itself.' is present in the main page heading", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="the headline 'Feedback that ships itself.' is visible"))
    
    async with testmu.step('Assertion check', instruction_id='7b210a8c-2a75-47e2-889f-1199a30d4655'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the headline 'Feedback that ships itself.' is visible", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{feedback_that_ships_itself_headline_visible}}', 'store_key': 'feedback_that_ships_itself_headline_visible', 'variable_refs': {'{{feedback_that_ships_itself_headline_visible}}': 'true'}}], 'sub_checks': [{'description': "the headline 'Feedback that ships itself.' is visible", 'store_key': 'feedback_that_ships_itself_headline_visible', 'expected_value': 'true', 'extracted_value': '{{feedback_that_ships_itself_headline_visible}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the headline 'Feedback that ships itself.' is visible"})
    
    async with testmu.step('Clicking Try the live demo in the main hero section', instruction_id='b73a30c4-4aa4-4874-81e5-f98013534c85'):
        _loc_1 = page.locator("internal:role=link[name=\"Try the live demo\"i]")
        
        await _loc_1.click()
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the live demo feedback board to load', instruction_id='9ffbdd04-ce1b-42c3-8b6b-31a93f2c0323'):
            await page.wait_for_timeout(500)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "a button labeled 'Post idea' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Checking whether the Post idea button is present'):
        set_var('post_idea_button_loaded', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {28: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(28).textContent.trim() === 'Post idea' && !el(28).disabled && !!(el(28).offsetWidth || el(28).offsetHeight || el(28).getClientRects().length));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=button[name="Post idea"i]'], query='whether the Post idea button in the complementary sidebar is present', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="a 'Post idea' button loads"))
    
    async with testmu.step('Checking whether the feedback board is present'):
        set_var('feedback_board_loaded', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {14: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(14).tagName === 'OL' && el(14).getAttribute('aria-label') === 'Requests' && el(14).children.length > 0);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=list[name="Requests"i]'], query="whether the feedback board's Requests list contains request entries in the main page content", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='a feedback board loads'))
    
    async with testmu.step('Checking whether the requests list is present'):
        set_var('requests_list_loaded', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {14: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(14).tagName === 'OL' && el(14).getAttribute('aria-label') === 'Requests' && el(14).children.length > 0);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=list[name="Requests"i]'], query='whether the Requests list in the main page content contains request entries', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='a list of requests loads'))
    
    async with testmu.step('Assertion check', instruction_id='31a0efb2-ed16-4258-839f-1783989312f9'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': 'a feedback board loads', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{feedback_board_loaded}}', 'store_key': 'feedback_board_loaded', 'variable_refs': {'{{feedback_board_loaded}}': 'true'}}, {'description': 'a list of requests loads', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{requests_list_loaded}}', 'store_key': 'requests_list_loaded', 'variable_refs': {'{{requests_list_loaded}}': 'true'}}, {'description': "a 'Post idea' button loads", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{post_idea_button_loaded}}', 'store_key': 'post_idea_button_loaded', 'variable_refs': {'{{post_idea_button_loaded}}': 'true'}}], 'sub_checks': [{'description': 'a feedback board loads', 'store_key': 'feedback_board_loaded', 'expected_value': 'true', 'extracted_value': '{{feedback_board_loaded}}', 'operator': 'equals', 'transforms': []}, {'description': 'a list of requests loads', 'store_key': 'requests_list_loaded', 'expected_value': 'true', 'extracted_value': '{{requests_list_loaded}}', 'operator': 'equals', 'transforms': []}, {'description': "a 'Post idea' button loads", 'store_key': 'post_idea_button_loaded', 'expected_value': 'true', 'extracted_value': '{{post_idea_button_loaded}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "a feedback board with a list of requests and a 'Post idea' button loads"})


if __name__ == "__main__":
    testmu.run(test)