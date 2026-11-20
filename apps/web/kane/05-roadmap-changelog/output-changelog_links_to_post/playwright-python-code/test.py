import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="879fbcd6-7886-4652-b01a-03b348bd2b77",
    name="Verify and Access Changelog Entry",
    tc_id="TC-23",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"search_the_board_entry_visible": "true", "verified_with_kane_cli_link_visible": "true", "search_the_board_post_page_open": "true"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/acme/changelog', instruction_id='b406c702-b651-4e87-b6c1-6a46ed6589a6'):
        variable_value_0 = var('{{global.base_url}}/acme/changelog')
        await page.goto(variable_value_0)
    
    async with testmu.step('Checking whether the Search the board entry is present'):
        set_var('search_the_board_entry_visible', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {12: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (((h)=>!!h&&h.textContent.trim()==='Search the board')(el(12).querySelector('h2')));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:testid=[data-testid="entry"s]'], query="whether an entry titled 'Search the board' is present in the Changelog list", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="an entry titled 'Search the board' is shown"))
    
    async with testmu.step('Checking whether the Verified with Kane CLI link is present with the Search the board entry'):
        set_var('verified_with_kane_cli_link_visible', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {12: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (((h,a)=>!!h&&h.textContent.trim()==='Search the board'&&!!a&&a.textContent.includes('Verified with Kane CLI'))(el(12).querySelector('h2'),el(12).querySelector('a')));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:testid=[data-testid="entry"s]'], query="whether a 'Verified with Kane CLI' link is present with the entry titled 'Search the board' in the Changelog list", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="a 'Verified with Kane CLI' link is shown with the entry titled 'Search the board'"))
    
    async with testmu.step('Assertion check', instruction_id='f1d42c05-c217-4d2d-82cb-77788d8cb960'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "an entry titled 'Search the board' is shown", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{search_the_board_entry_visible}}', 'store_key': 'search_the_board_entry_visible', 'variable_refs': {'{{search_the_board_entry_visible}}': 'true'}}, {'description': "a 'Verified with Kane CLI' link is shown with the entry titled 'Search the board'", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{verified_with_kane_cli_link_visible}}', 'store_key': 'verified_with_kane_cli_link_visible', 'variable_refs': {'{{verified_with_kane_cli_link_visible}}': 'true'}}], 'sub_checks': [{'description': "an entry titled 'Search the board' is shown", 'store_key': 'search_the_board_entry_visible', 'expected_value': 'true', 'extracted_value': '{{search_the_board_entry_visible}}', 'operator': 'equals', 'transforms': []}, {'description': "a 'Verified with Kane CLI' link is shown with the entry titled 'Search the board'", 'store_key': 'verified_with_kane_cli_link_visible', 'expected_value': 'true', 'extracted_value': '{{verified_with_kane_cli_link_visible}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "an entry titled 'Search the board' is shown with a 'Verified with Kane CLI' link"})
    
    async with testmu.step('Clicking the Verified with Kane CLI link for the Search the board entry', instruction_id='ec9e6c2d-548e-42ac-ace7-386a5c671bdc'):
        _loc_1 = page.locator("internal:role=link[name=\"Verified with Kane CLI · from\"i]")
        
        await _loc_1.click()
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the board post page to load', instruction_id='3391af0e-2790-4a6c-815f-57c58e1254f1'):
            await page.wait_for_timeout(500)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "the heading 'Search the board' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Checking whether the Search the board post page is present'):
        set_var('search_the_board_post_page_open', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {11: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(11).tagName === 'H1' && el(11).textContent.trim() === 'Search the board');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="Search the board"i]'], query="whether the post page heading 'Search the board' is present in the page content", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="the post page for 'Search the board' opens"))
    
    async with testmu.step('Assertion check', instruction_id='0de1bba3-0e2a-4d6d-9026-5f29bf1ed47d'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the post page for 'Search the board' opens", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{search_the_board_post_page_open}}', 'store_key': 'search_the_board_post_page_open', 'variable_refs': {'{{search_the_board_post_page_open}}': 'true'}}], 'sub_checks': [{'description': "the post page for 'Search the board' opens", 'store_key': 'search_the_board_post_page_open', 'expected_value': 'true', 'extracted_value': '{{search_the_board_post_page_open}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the post page for 'Search the board' opens"})


if __name__ == "__main__":
    testmu.run(test)