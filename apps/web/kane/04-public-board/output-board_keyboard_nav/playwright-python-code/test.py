import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="f79d10cf-2e43-4e56-922c-be1bf36baff9",
    name="Verify Keyboard Navigation and Request Page Access",
    tc_id="TC-63",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"board_shown_check": "true", "requests_list_shown_check": "true", "error_page_shown_check": "false", "selected_request_page_open_check": "true", "selected_request_title_shown_check": "true"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/acme', instruction_id='0a01eac6-b82a-4932-9c5d-cc53e1b1fbc9'):
        variable_value_0 = var('{{global.base_url}}/acme')
        await page.goto(variable_value_0)
    
    async with testmu.step('Pressing the J key', instruction_id='069ff7f1-5021-495c-b23a-bc82f7092312'):
        await page.wait_for_timeout(500)
        await page.keyboard.press('j')
    
    async with testmu.step('Pressing the j key', instruction_id='373b16a2-5106-40ef-9f93-0a8655c9677a'):
        await page.wait_for_timeout(500)
        await page.keyboard.press('j')
    
    async with testmu.step('Pressing j key three times', instruction_id='d44e3559-30d2-4e34-8461-13ad0a433d40'):
        await page.wait_for_timeout(500)
        await page.keyboard.press('j')
    
    async with testmu.step('Pressing the k key once', instruction_id='ddc87194-baf8-4883-9391-5c15ffcc81de'):
        await page.wait_for_timeout(500)
        await page.keyboard.press('k')
    
    async with testmu.step('Checking whether the board is present'):
        set_var('board_shown_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {4: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(4).textContent.trim() === 'Board' && (() => { const s = getComputedStyle(el(4)), r = el(4).getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0; })());\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=link[name="Board"s]'], query='whether the Board navigation item is visible in the page header', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='the board is still shown'))
    
    async with testmu.step('Checking whether the list of requests is present'):
        set_var('requests_list_shown_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {17: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(17).getAttribute('aria-label') === 'Requests' && (() => { const s = getComputedStyle(el(17)), r = el(17).getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0; })());\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=list[name="Requests"i]'], query='whether the Requests list is visible in the board content', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='the list of requests is shown'))
    
    async with testmu.step('whether an error page is visible in the page content', instruction_id='f93742a5-601f-476e-a40d-14d317ff0f8d'):
        set_var('error_page_shown_check', await testmu.vision_query(page, "whether an error page is visible in the page content", ""))
    
    async with testmu.step('Assertion check', instruction_id='9a1df3d6-4a53-4f40-b699-ad4680fbc16a'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': 'the board is still shown', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{board_shown_check}}', 'store_key': 'board_shown_check', 'variable_refs': {'{{board_shown_check}}': 'true'}}, {'description': 'the list of requests is shown', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{requests_list_shown_check}}', 'store_key': 'requests_list_shown_check', 'variable_refs': {'{{requests_list_shown_check}}': 'true'}}, {'description': 'no error page is shown', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'false', 'extracted_value': '{{error_page_shown_check}}', 'store_key': 'error_page_shown_check', 'variable_refs': {'{{error_page_shown_check}}': 'false'}}], 'sub_checks': [{'description': 'the board is still shown', 'store_key': 'board_shown_check', 'expected_value': 'true', 'extracted_value': '{{board_shown_check}}', 'operator': 'equals', 'transforms': []}, {'description': 'the list of requests is shown', 'store_key': 'requests_list_shown_check', 'expected_value': 'true', 'extracted_value': '{{requests_list_shown_check}}', 'operator': 'equals', 'transforms': []}, {'description': 'no error page is shown', 'store_key': 'error_page_shown_check', 'expected_value': 'false', 'extracted_value': '{{error_page_shown_check}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': 'the board is still shown with its list of requests and no error page'})
    
    async with testmu.step('Pressing Enter key', instruction_id='f7e949f6-694d-46be-9d79-2087795eb68c'):
        await page.wait_for_timeout(500)
        await page.keyboard.press('Enter')
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the selected request title to become visible', instruction_id='304cc0cf-c468-43a1-8a3c-1a3a6fe58977'):
            await page.wait_for_timeout(500)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "the text 'Search the board' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Checking whether the selected request page is present'):
        set_var('selected_request_page_open_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {24: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(24).textContent.trim() === 'Details');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="Details"i'], query='whether the Details section for the selected request is present in the right-hand request panel', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='the page of the selected request opens'))
    
    async with testmu.step('Checking whether the selected request title is present'):
        set_var('selected_request_title_shown_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {20: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(20).textContent.trim() === 'Kane CLI verifications');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="Kane CLI verifications"i]'], query='whether the selected request title is present as the request heading on the board', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='the selected request title is shown'))
    
    async with testmu.step('Assertion check', instruction_id='f1d6f65b-37c5-4ab2-ba46-2c2f7d81880c'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': 'the page of the selected request opens', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{selected_request_page_open_check}}', 'store_key': 'selected_request_page_open_check', 'variable_refs': {'{{selected_request_page_open_check}}': 'true'}}, {'description': 'the selected request title is shown', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{selected_request_title_shown_check}}', 'store_key': 'selected_request_title_shown_check', 'variable_refs': {'{{selected_request_title_shown_check}}': 'true'}}], 'sub_checks': [{'description': 'the page of the selected request opens', 'store_key': 'selected_request_page_open_check', 'expected_value': 'true', 'extracted_value': '{{selected_request_page_open_check}}', 'operator': 'equals', 'transforms': []}, {'description': 'the selected request title is shown', 'store_key': 'selected_request_title_shown_check', 'expected_value': 'true', 'extracted_value': '{{selected_request_title_shown_check}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': 'the page of the selected request opens with its title'})


if __name__ == "__main__":
    testmu.run(test)