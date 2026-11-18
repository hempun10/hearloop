import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="3806fdd8-1ec2-4970-be1b-57f8ae40a5ff",
    name="Verify Kane Test Run Status",
    tc_id="TC-26",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"passed_search_the_board_run": "true", "kane_passed_report_content": "true"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/login?next=/acme/dashboard/runs', instruction_id='b08cc5f1-ca59-4be0-9245-8760f1d40a81'):
        variable_value_0 = var('{{global.base_url}}/login?next=/acme/dashboard/runs')
        await page.goto(variable_value_0)
    
    async with testmu.step('Waiting for email and password fields to be filled and sign-in to start', instruction_id='d95a4298-4fe4-4c66-b5a6-d6ec585f3337'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "{{global.e2e_email}}" into "Email"', instruction_id='fa50a2b0-2086-4a16-906e-d4b55cf14f6a'):
        element_1 = page.locator("internal:role=textbox[name=\"Email\"i]")
        variable_value_2 = var('{{global.e2e_email}}')
        
        await testmu.fill(element_1, variable_value_2)
    
    async with testmu.step('Type "[REDACTED]" into "Password"', instruction_id='05f3f91e-2e77-4b2a-b8e2-149f5ec7d72b'):
        element_3 = page.locator("internal:role=textbox[name=\"Password\"i]")
        variable_value_4 = var('{{secrets.user.e2e_password}}')
        
        await testmu.fill(element_3, variable_value_4)
    
    async with testmu.step('Clicking Sign in button in the Sign in form', instruction_id='f7192ec1-67c5-4cb9-ae40-7972210d4a4a'):
        _loc_1 = page.locator("internal:role=button[name=\"Sign in\"i]")
        
        await _loc_1.click()
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the Kane runs page to load', instruction_id='b7b7c473-bff0-40e2-8855-b66dfca5b0bd'):
            await page.wait_for_timeout(500)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "the heading 'Kane runs' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Checking whether the Search the board run passed'):
        set_var('passed_search_the_board_run', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {16: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(16).textContent.includes('Passed') && el(16).textContent.includes('Search the board'));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="PassedSearch the board30m"i'], query='whether a Passed run for Search the board is present in the Kane runs list', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="the Kane runs page lists a 'Passed' run for 'Search the board'"))
    
    async with testmu.step('Assertion check', instruction_id='165cdab6-1e24-4a2a-9118-fc5a50d75e4b'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the Kane runs page lists a 'Passed' run for 'Search the board'", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{passed_search_the_board_run}}', 'store_key': 'passed_search_the_board_run', 'variable_refs': {'{{passed_search_the_board_run}}': 'true'}}], 'sub_checks': [{'description': "the Kane runs page lists a 'Passed' run for 'Search the board'", 'store_key': 'passed_search_the_board_run', 'expected_value': 'true', 'extracted_value': '{{passed_search_the_board_run}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the Kane runs page lists a 'Passed' run for 'Search the board'"})
    
    async with testmu.step('Clicking the Passed run row for Search the board 30m', instruction_id='a481403a-6503-4e09-922a-52939d203e07'):
        _loc_2 = page.locator("internal:text=\"PassedSearch the board30m\"i")
        
        await _loc_2.click()
    
    async with testmu.step('Checking whether the expanded report contains Kane: passed'):
        set_var('kane_passed_report_content', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {15: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(15).textContent.includes('Kane: passed'));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="PassedSearch the board30mKane"i'], query="whether the text 'Kane: passed' is present in the expanded Kane runs report", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="the expanded report contains 'Kane: passed'"))
    
    async with testmu.step('Assertion check', instruction_id='2d2fa0bf-34a7-442f-b24f-6a4782f8955e'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the expanded report contains 'Kane: passed'", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{kane_passed_report_content}}', 'store_key': 'kane_passed_report_content', 'variable_refs': {'{{kane_passed_report_content}}': 'true'}}], 'sub_checks': [{'description': "the expanded report contains 'Kane: passed'", 'store_key': 'kane_passed_report_content', 'expected_value': 'true', 'extracted_value': '{{kane_passed_report_content}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the expanded report contains 'Kane: passed'"})


if __name__ == "__main__":
    testmu.run(test)