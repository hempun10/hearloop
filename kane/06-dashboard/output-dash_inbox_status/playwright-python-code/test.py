import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="59172721-11a3-4ed6-8b9b-017f42399be3",
    name="Update and Verify Post Status in Inbox",
    tc_id="TC-24",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"planned_count_2_check": "2", "planned_count_1_check": "1"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/login?next=/acme/dashboard', instruction_id='3f3e8335-c658-4f56-9caa-b686f96f83f3'):
        variable_value_0 = var('{{global.base_url}}/login?next=/acme/dashboard')
        await page.goto(variable_value_0)
    
    async with testmu.step('Waiting for the plan steps to run', instruction_id='773782c1-ad23-44e7-b65a-29f015de921a'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "{{global.e2e_email}}" into "Email"', instruction_id='ae456049-8ef9-4ee7-b6f4-a1b2fb45cd5b'):
        element_1 = page.locator("internal:role=textbox[name=\"Email\"i]")
        variable_value_2 = var('{{global.e2e_email}}')
        
        await testmu.fill(element_1, variable_value_2)
    
    async with testmu.step('Type "[REDACTED]" into "Password"', instruction_id='24f1f852-1db3-4f4c-a9a2-82bc437a0236'):
        element_3 = page.locator("internal:role=textbox[name=\"Password\"i]")
        variable_value_4 = var('{{secrets.user.e2e_password}}')
        
        await testmu.fill(element_3, variable_value_4)
    
    async with testmu.step('Clicking Sign in', instruction_id='55a9cac2-212c-450f-8ff9-37824fb3dfc3'):
        _loc_1 = page.locator("internal:role=button[name=\"Sign in\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Waiting for sign-in to complete on the Inbox dashboard', instruction_id='98f36404-5810-464a-86b5-eb817af862e3'):
        await page.wait_for_timeout(500)
    
    async with testmu.step('Selecting Planned status for Export posts to CSV', instruction_id='15e0b346-6747-4615-830f-f5d26b95f5f5'):
        element_5 = page.locator("internal:label=\"Status of Export posts to CSV\"i")
        
        await element_5.select_option()
    
    async with testmu.step('Reading the Planned count from the status filter list'):
        set_var('planned_count_2_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {18: 0};\n  const el = (i) => els[__m[i]];\n  const __v = ((el(18).innerText.match(/\\bPlanned\\s+(\\d+)\\s*$/)||[])[1] ?? null);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=link[name="Planned Planned"i]'], query='the Planned count in the left status filter list', expected_value='2', needs_unit_conversion=False, operator='equals', transforms=['strip'], condition="the 'Planned' count in the left list is 2"))
    
    async with testmu.step('Assertion check', instruction_id='48ca5040-685d-4457-a2a5-071b326ababe'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the 'Planned' count in the left list is 2", 'passed': True, 'operator': 'equals', 'transforms': ['strip'], 'json_path': None, 'expected': '2', 'extracted_value': '{{planned_count_2_check}}', 'store_key': 'planned_count_2_check', 'variable_refs': {'{{planned_count_2_check}}': '2'}}], 'sub_checks': [{'description': "the 'Planned' count in the left list is 2", 'store_key': 'planned_count_2_check', 'expected_value': '2', 'extracted_value': '{{planned_count_2_check}}', 'operator': 'equals', 'transforms': ['strip']}], 'composite_operator': 'and', 'claim': "the 'Planned' count in the left list is 2"})
    
    async with testmu.step('Setting Export posts to CSV status to Open', instruction_id='aaf22da8-7a91-4045-8ea1-70265a707b10'):
        element_6 = page.locator("internal:label=\"Status of Export posts to CSV\"i")
        
        await element_6.select_option()
    
    async with testmu.step('Reading the Planned count from the status filter list'):
        set_var('planned_count_1_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {18: 0};\n  const el = (i) => els[__m[i]];\n  const __v = ((el(18).innerText.match(/Planned\\s+(\\d+)\\s*$/)||[])[1] ?? null);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=link[name="Planned Planned"i]'], query='the numeric count displayed for Planned in the left status filter list', expected_value='1', needs_unit_conversion=False, operator='equals', transforms=['strip'], condition="the 'Planned' count in the left list is 1"))
    
    async with testmu.step('Assertion check', instruction_id='5481e7eb-915c-495c-ae30-c19d71e6890d'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the 'Planned' count in the left list is 1", 'passed': True, 'operator': 'equals', 'transforms': ['strip'], 'json_path': None, 'expected': '1', 'extracted_value': '{{planned_count_1_check}}', 'store_key': 'planned_count_1_check', 'variable_refs': {'{{planned_count_1_check}}': '1'}}], 'sub_checks': [{'description': "the 'Planned' count in the left list is 1", 'store_key': 'planned_count_1_check', 'expected_value': '1', 'extracted_value': '{{planned_count_1_check}}', 'operator': 'equals', 'transforms': ['strip']}], 'composite_operator': 'and', 'claim': "the 'Planned' count in the left list is 1"})


if __name__ == "__main__":
    testmu.run(test)