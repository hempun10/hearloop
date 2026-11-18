import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="e53a3603-c220-49ac-91a0-f3115b25c7cc",
    name="Verify Sign-In Back Button Navigation",
    tc_id="TC-37",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"sign_in_back_button_visible": "true", "sign_in_how_it_works_link_absent": "false", "feedback_that_ships_itself_headline_visible": "true", "acme_board_shown": "true", "acme_board_requests_list_shown": "true", "landing_page_not_shown": "false"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/', instruction_id='9c104719-9419-4de2-afd5-5483f75134a3'):
        variable_value_0 = var('{{global.base_url}}/')
        await page.goto(variable_value_0)
    
    async with testmu.step('Clicking Sign in in the header', instruction_id='7bf1933c-d3fd-4c0f-96a4-45adea7fe95a'):
        _loc_1 = page.locator("internal:role=banner >> internal:role=link[name=\"Sign in\"i]")
        
        await _loc_1.click()
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the sign-in page back button to become visible', instruction_id='99bbf872-e35c-4072-a605-9c16ad9f10b1'):
            await page.wait_for_timeout(1000)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "a button labeled 'Back' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Checking whether the sign-in Back button is present'):
        set_var('sign_in_back_button_visible', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {2: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(2).textContent.trim() === 'Back' && !el(2).hidden && getComputedStyle(el(2)).display !== 'none' && getComputedStyle(el(2)).visibility !== 'hidden');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=button[name="Back"i]'], query='whether the sign-in page Back button is present', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="The sign-in page shows a 'Back' button."))
    
    async with testmu.step('Checking whether the sign-in How it works link is present'):
        set_var('sign_in_how_it_works_link_absent', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {1: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (Array.from(el(1).querySelectorAll('a')).some(a => a.textContent.trim() === 'How it works' && !a.hidden && getComputedStyle(a).display !== 'none' && getComputedStyle(a).visibility !== 'hidden'));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="BackSign inWelcome back."i'], query='whether the sign-in page How it works link is present', expected_value='false', needs_unit_conversion=False, operator='equals', transforms=[], condition="The sign-in page shows no 'How it works' link."))
    
    async with testmu.step('Assertion check', instruction_id='4d137a2e-fdde-4574-8094-bbe1acbea255'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "The sign-in page shows a 'Back' button.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{sign_in_back_button_visible}}', 'store_key': 'sign_in_back_button_visible', 'variable_refs': {'{{sign_in_back_button_visible}}': 'true'}}, {'description': "The sign-in page shows no 'How it works' link.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'false', 'extracted_value': '{{sign_in_how_it_works_link_absent}}', 'store_key': 'sign_in_how_it_works_link_absent', 'variable_refs': {'{{sign_in_how_it_works_link_absent}}': 'false'}}], 'sub_checks': [{'description': "The sign-in page shows a 'Back' button.", 'store_key': 'sign_in_back_button_visible', 'expected_value': 'true', 'extracted_value': '{{sign_in_back_button_visible}}', 'operator': 'equals', 'transforms': []}, {'description': "The sign-in page shows no 'How it works' link.", 'store_key': 'sign_in_how_it_works_link_absent', 'expected_value': 'false', 'extracted_value': '{{sign_in_how_it_works_link_absent}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the sign-in page shows a 'Back' button and no 'How it works' link"})
    
    async with testmu.step('Clicking Back button on sign-in page', instruction_id='2b4f61cc-a9f7-492f-8400-cd941a63bef9'):
        _loc_2 = page.locator("internal:role=button[name=\"Back\"i]")
        
        await _loc_2.click()
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the headline Feedback that ships itself to be visible', instruction_id='91caa777-2b11-4776-9449-2fe4037a9be2'):
            await page.wait_for_timeout(1000)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "the heading 'Feedback that ships itself.' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Checking whether the Feedback that ships itself headline is present'):
        set_var('feedback_that_ships_itself_headline_visible', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {14: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(14).textContent.trim() === 'Feedback that ships itself.' && !!(el(14).offsetWidth || el(14).offsetHeight || el(14).getClientRects().length));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="Feedback that ships itself."i]'], query="whether the headline 'Feedback that ships itself.' is present in the main page content", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="The headline 'Feedback that ships itself.' is visible."))
    
    async with testmu.step('Assertion check', instruction_id='9cad9195-4978-4876-98da-55d2d6d59244'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "The headline 'Feedback that ships itself.' is visible.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{feedback_that_ships_itself_headline_visible}}', 'store_key': 'feedback_that_ships_itself_headline_visible', 'variable_refs': {'{{feedback_that_ships_itself_headline_visible}}': 'true'}}], 'sub_checks': [{'description': "The headline 'Feedback that ships itself.' is visible.", 'store_key': 'feedback_that_ships_itself_headline_visible', 'expected_value': 'true', 'extracted_value': '{{feedback_that_ships_itself_headline_visible}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the headline 'Feedback that ships itself.' is visible"})
    
    async with testmu.step('Navigating to /acme', instruction_id='f382c094-a9d4-467d-a7d1-233629daf23b'):
        variable_value_1 = var('{{global.base_url}}/acme')
        await page.goto(variable_value_1)
    
    async with testmu.step('Clicking Sign in in the board header', instruction_id='a92ed227-e494-48df-aa3a-e07522b766d8'):
        _loc_3 = page.locator("internal:role=link[name=\"Sign in\"i]")
        
        await _loc_3.click()
    
    async with testmu.step('Clicking Back in the top-left corner', instruction_id='e2672552-3fba-4545-a6c9-9964558e5935'):
        _loc_4 = page.locator("internal:role=button[name=\"Back\"i]")
        
        await _loc_4.click()
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the Acme board heading to be visible', instruction_id='1822bd84-4530-4d88-9946-8c8847070961'):
            await page.wait_for_timeout(1000)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "the heading 'Acme' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Checking whether the Acme board is present'):
        set_var('acme_board_shown', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {9: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(9).textContent.trim() === 'Acme' && !!(el(9).offsetWidth || el(9).offsetHeight || el(9).getClientRects().length));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="Acme"i]'], query='whether the Acme board heading is present in the main page content', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='The Acme board is shown.'))
    
    async with testmu.step('Checking whether the Acme board requests list is present'):
        set_var('acme_board_requests_list_shown', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {17: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(17).getAttribute('aria-label') === 'Requests' && !!(el(17).offsetWidth || el(17).offsetHeight || el(17).getClientRects().length));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=list[name="Requests"i]'], query='whether the Requests list is present in the Acme board main content', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="The Acme board's list of requests is shown."))
    
    async with testmu.step('whether the landing page is present in the visible page content', instruction_id='699d6bd6-2baa-47c8-95a8-43ef2625f37a'):
        set_var('landing_page_not_shown', await testmu.vision_query(page, "whether the landing page is present in the visible page content", ""))
    
    async with testmu.step('Assertion check', instruction_id='81daa3fa-5a3e-454d-b6aa-c25721f50970'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': 'The Acme board is shown.', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{acme_board_shown}}', 'store_key': 'acme_board_shown', 'variable_refs': {'{{acme_board_shown}}': 'true'}}, {'description': "The Acme board's list of requests is shown.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{acme_board_requests_list_shown}}', 'store_key': 'acme_board_requests_list_shown', 'variable_refs': {'{{acme_board_requests_list_shown}}': 'true'}}, {'description': 'The landing page is not shown.', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'false', 'extracted_value': '{{landing_page_not_shown}}', 'store_key': 'landing_page_not_shown', 'variable_refs': {'{{landing_page_not_shown}}': 'false'}}], 'sub_checks': [{'description': 'The Acme board is shown.', 'store_key': 'acme_board_shown', 'expected_value': 'true', 'extracted_value': '{{acme_board_shown}}', 'operator': 'equals', 'transforms': []}, {'description': "The Acme board's list of requests is shown.", 'store_key': 'acme_board_requests_list_shown', 'expected_value': 'true', 'extracted_value': '{{acme_board_requests_list_shown}}', 'operator': 'equals', 'transforms': []}, {'description': 'The landing page is not shown.', 'store_key': 'landing_page_not_shown', 'expected_value': 'false', 'extracted_value': '{{landing_page_not_shown}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': 'the Acme board with its list of requests is shown, not the landing page'})


if __name__ == "__main__":
    testmu.run(test)