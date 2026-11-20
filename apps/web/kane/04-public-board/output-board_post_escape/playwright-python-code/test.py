import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="ed28feec-1c69-46bc-9aae-486e7941453d",
    name="Verify Search the Board Request Functionality",
    tc_id="TC-64",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"request_page_title_check": "Search the board", "acme_board_shown_check": "true", "acme_board_request_list_shown_check": "true"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/acme', instruction_id='db3c3098-fd3b-46d7-ae12-e684ebfceb0f'):
        variable_value_0 = var('{{global.base_url}}/acme')
        await page.goto(variable_value_0)
    
    async with testmu.step('Clicking Search the board link in the Requests list', instruction_id='0fc8b265-b2dc-48f2-85d9-74763a8fdb20'):
        _loc_1 = page.locator("internal:role=link[name=\"Search the board\"i]")
        
        await _loc_1.click()
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the Search the board page to load', instruction_id='0987856a-f74b-413d-9b54-f5037136eaf1'):
            await page.wait_for_timeout(1000)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "the heading 'Search the board' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Reading the request page title'):
        set_var('request_page_title_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {11: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(11).textContent);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="Search the board"i]'], query='the request page heading text', expected_value='Search the board', needs_unit_conversion=False, operator='equals', transforms=['strip'], condition="the request page shows the title 'Search the board'"))
    
    async with testmu.step('Assertion check', instruction_id='e86ed68f-912c-4565-ae68-d46d4f6e6d13'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the request page shows the title 'Search the board'", 'passed': True, 'operator': 'equals', 'transforms': ['strip'], 'json_path': None, 'expected': 'Search the board', 'extracted_value': '{{request_page_title_check}}', 'store_key': 'request_page_title_check', 'variable_refs': {'{{request_page_title_check}}': 'Search the board'}}], 'sub_checks': [{'description': "the request page shows the title 'Search the board'", 'store_key': 'request_page_title_check', 'expected_value': 'Search the board', 'extracted_value': '{{request_page_title_check}}', 'operator': 'equals', 'transforms': ['strip']}], 'composite_operator': 'and', 'claim': "the request page shows the title 'Search the board'"})
    
    async with testmu.step('Pressing Escape key', instruction_id='e288e7da-724c-4c14-9d55-01892051ab2f'):
        await page.wait_for_timeout(500)
        await page.keyboard.press('Escape')
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the Acme board to load again', instruction_id='087918c9-e40d-4730-89a9-beada423a07a'):
            await page.wait_for_timeout(1000)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "the heading 'Acme' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Checking whether the Acme board is present'):
        set_var('acme_board_shown_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {9: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(9).textContent.trim() === 'Acme');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="Acme"i]'], query='whether the Acme board heading is present in the main page content', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='the Acme board is shown again'))
    
    async with testmu.step('Checking whether the Acme board request list is present'):
        set_var('acme_board_request_list_shown_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {17: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(17).textContent.includes('Dark mode toggle') && el(17).getClientRects().length > 0);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=list[name="Requests"i]'], query='whether the Requests list with request entries is shown in the Acme board main content', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="the Acme board's list of requests is shown again"))
    
    async with testmu.step('Assertion check', instruction_id='0ecea202-1687-475a-a1b7-4bb8d8004739'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': 'the Acme board is shown again', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{acme_board_shown_check}}', 'store_key': 'acme_board_shown_check', 'variable_refs': {'{{acme_board_shown_check}}': 'true'}}, {'description': "the Acme board's list of requests is shown again", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{acme_board_request_list_shown_check}}', 'store_key': 'acme_board_request_list_shown_check', 'variable_refs': {'{{acme_board_request_list_shown_check}}': 'true'}}], 'sub_checks': [{'description': 'the Acme board is shown again', 'store_key': 'acme_board_shown_check', 'expected_value': 'true', 'extracted_value': '{{acme_board_shown_check}}', 'operator': 'equals', 'transforms': []}, {'description': "the Acme board's list of requests is shown again", 'store_key': 'acme_board_request_list_shown_check', 'expected_value': 'true', 'extracted_value': '{{acme_board_request_list_shown_check}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': 'the Acme board with its list of requests is shown again'})


if __name__ == "__main__":
    testmu.run(test)