import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="5d45c857-ebdd-4414-8228-4b100235dbe1",
    name="Create New Account and Reach Board Naming",
    tc_id="TC-12",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"page_heading_check": "Name your board"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/login?mode=signup', instruction_id='d7c10d1b-9020-4820-8188-b2047b70209a'):
        variable_value_0 = var('{{global.base_url}}/login?mode=signup')
        await page.goto(variable_value_0)
    
    async with testmu.step('Waiting for the queued plan to finish entering Name and Email', instruction_id='52d3b6fb-3821-4e62-bc62-026d805827d6'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "New Tester" into "Name"', instruction_id='7170f097-09a3-452f-ad27-6a6871da9ea9'):
        element_1 = page.locator("internal:role=textbox[name=\"Name\"i]")
        
        await testmu.fill(element_1, "New Tester")
    
    async with testmu.step('Type "{{smart.random_email}}" into "Email"', instruction_id='20638026-ec65-4373-853f-3b708cf891ac'):
        element_2 = page.locator("internal:role=textbox[name=\"Email\"i]")
        variable_value_3 = var('{{smart.random_email}}')
        
        await testmu.fill(element_2, variable_value_3)
    
    async with testmu.step('Typing in the password', instruction_id='1f2ef4c7-0505-46f0-9e3a-bdbf17ffe0fb'):
        element_4 = page.locator("internal:role=textbox[name=\"Password\"i]")
        
        await testmu.fill(element_4, "correct-horse-9")
    
    async with testmu.step('Clicking Create account button', instruction_id='40acc9ae-788b-45f5-b0af-f209b6b8ec94'):
        _loc_1 = page.locator("internal:role=button[name=\"Create account\"i]")
        
        await _loc_1.click()
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the Name your board heading to be visible', instruction_id='6353337e-47e8-44f6-9c31-d5049b915add'):
            await page.wait_for_timeout(1000)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "the heading 'Name your board' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Reading the page heading'):
        set_var('page_heading_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {8: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(8).textContent);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="Name your board"i]'], query='the page heading text in the main content', expected_value='Name your board', needs_unit_conversion=False, operator='equals', transforms=['strip'], condition="the page heading is 'Name your board'"))
    
    async with testmu.step('Assertion check', instruction_id='a26a029f-c388-4f85-aa0c-5e683c027ea5'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the page heading is 'Name your board'", 'passed': True, 'operator': 'equals', 'transforms': ['strip'], 'json_path': None, 'expected': 'Name your board', 'extracted_value': '{{page_heading_check}}', 'store_key': 'page_heading_check', 'variable_refs': {'{{page_heading_check}}': 'Name your board'}}], 'sub_checks': [{'description': "the page heading is 'Name your board'", 'store_key': 'page_heading_check', 'expected_value': 'Name your board', 'extracted_value': '{{page_heading_check}}', 'operator': 'equals', 'transforms': ['strip']}], 'composite_operator': 'and', 'claim': "the page heading is 'Name your board'"})


if __name__ == "__main__":
    testmu.run(test)