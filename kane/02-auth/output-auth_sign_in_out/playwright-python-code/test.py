import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="2725fc77-df55-4761-ab21-05a5cdd087d9",
    name="User Sign In and Sign Out Verification",
    tc_id="TC-13",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"acme_board_loaded": "true", "dashboard_link_in_header": "true", "sign_in_in_header": "true", "dashboard_link_in_header_after_sign_out": "false"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/login', instruction_id='44a22344-3414-4f5b-9ea6-1bcf87afe2f2'):
        variable_value_0 = var('{{global.base_url}}/login')
        await page.goto(variable_value_0)
    
    async with testmu.step('Waiting for the sign-in form steps to finish', instruction_id='fbc56348-12d4-4e02-8a48-bdc8f0e56df6'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "{{global.e2e_email}}" into "Email"', instruction_id='b8bf863a-e83f-463b-b980-a31cd8fd1f36'):
        element_1 = page.locator("internal:role=textbox[name=\"Email\"i]")
        variable_value_2 = var('{{global.e2e_email}}')
        
        await testmu.fill(element_1, variable_value_2)
    
    async with testmu.step('Type "[REDACTED]" into "Password"', instruction_id='db992f94-84eb-402b-bb92-72644da15161'):
        element_3 = page.locator("internal:role=textbox[name=\"Password\"i]")
        variable_value_4 = var('{{secrets.user.e2e_password}}')
        
        await testmu.fill(element_3, variable_value_4)
    
    async with testmu.step('Clicking Sign in with email button', instruction_id='6ff82745-71b5-4de2-9e45-a4ce67c8c65a'):
        _loc_1 = page.locator("internal:role=button[name=\"Sign in\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Checking whether the Acme board is present'):
        set_var('acme_board_loaded', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {10: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(10).textContent.trim() === 'Acme');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="Acme"i]'], query='whether the Acme board heading is present in the main content', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='the Acme board loads'))
    
    async with testmu.step('Checking whether the Dashboard header link is present'):
        set_var('dashboard_link_in_header', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {7: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(7).textContent.trim() === 'Dashboard' && el(7).getAttribute('href') === '/acme/dashboard');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=link[name="Dashboard"i]'], query='whether the Dashboard link is present in the header navigation', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="the header shows a 'Dashboard' link"))
    
    async with testmu.step('Assertion check', instruction_id='61630c39-f529-4ad2-9dd8-8a914e1eb10e'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': 'the Acme board loads', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{acme_board_loaded}}', 'store_key': 'acme_board_loaded', 'variable_refs': {'{{acme_board_loaded}}': 'true'}}], 'sub_checks': [{'description': 'the Acme board loads', 'store_key': 'acme_board_loaded', 'expected_value': 'true', 'extracted_value': '{{acme_board_loaded}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': 'the Acme board loads'})
    
    async with testmu.step('Assertion check', instruction_id='5b03bf3c-f0c5-400e-8fe1-6802a2670eba'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the header shows a 'Dashboard' link", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{dashboard_link_in_header}}', 'store_key': 'dashboard_link_in_header', 'variable_refs': {'{{dashboard_link_in_header}}': 'true'}}], 'sub_checks': [{'description': "the header shows a 'Dashboard' link", 'store_key': 'dashboard_link_in_header', 'expected_value': 'true', 'extracted_value': '{{dashboard_link_in_header}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the header shows a 'Dashboard' link"})
    
    async with testmu.step('Clicking Sign out in the header', instruction_id='fd653015-fbd8-46b0-b018-82afd61968fe'):
        _loc_2 = page.locator("internal:role=button[name=\"E Sign out\"i]")
        
        await _loc_2.click()
    
    async with testmu.step('Checking whether the header Sign in link is present'):
        set_var('sign_in_in_header', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {1: 0};\n  const el = (i) => els[__m[i]];\n  const __v = ([...el(1).querySelectorAll('a')].some(a => a.textContent.trim() === 'Sign in'));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="AAcmeBoardRoadmapChangelogSign inBoardRoadmapChangelog"i'], query="whether the 'Sign in' link in the page header is present", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="the header shows 'Sign in'"))
    
    async with testmu.step('Checking whether the header Dashboard link is present'):
        set_var('dashboard_link_in_header_after_sign_out', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {1: 0};\n  const el = (i) => els[__m[i]];\n  const __v = ([...el(1).querySelectorAll('a')].some(a => a.textContent.trim() === 'Dashboard'));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="AAcmeBoardRoadmapChangelogSign inBoardRoadmapChangelog"i'], query="whether a 'Dashboard' link in the page header is present", expected_value='false', needs_unit_conversion=False, operator='equals', transforms=[], condition="the header shows no 'Dashboard' link"))
    
    async with testmu.step('Assertion check', instruction_id='e01956c9-0743-4de1-94c5-01419b2b5e7c'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the header shows 'Sign in'", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{sign_in_in_header}}', 'store_key': 'sign_in_in_header', 'variable_refs': {'{{sign_in_in_header}}': 'true'}}, {'description': "the header shows no 'Dashboard' link", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'false', 'extracted_value': '{{dashboard_link_in_header_after_sign_out}}', 'store_key': 'dashboard_link_in_header_after_sign_out', 'variable_refs': {'{{dashboard_link_in_header_after_sign_out}}': 'false'}}], 'sub_checks': [{'description': "the header shows 'Sign in'", 'store_key': 'sign_in_in_header', 'expected_value': 'true', 'extracted_value': '{{sign_in_in_header}}', 'operator': 'equals', 'transforms': []}, {'description': "the header shows no 'Dashboard' link", 'store_key': 'dashboard_link_in_header_after_sign_out', 'expected_value': 'false', 'extracted_value': '{{dashboard_link_in_header_after_sign_out}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the header shows 'Sign in' and no 'Dashboard' link"})


if __name__ == "__main__":
    testmu.run(test)