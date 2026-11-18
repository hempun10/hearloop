import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="eac438eb-3911-4169-90d3-1fe9d6f1bcb7",
    name="Verify Request Post Details",
    tc_id="TC-21",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"post_page_title_check": "Search the board", "shipped_status_reached": "true", "kane_cli_verifications_passed_entry": "true"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/acme', instruction_id='64936a59-bc2c-4bf0-acae-1ed69d9f573e'):
        variable_value_0 = var('{{global.base_url}}/acme')
        await page.goto(variable_value_0)
    
    async with testmu.step('Clicking Search the board link in the Requests list', instruction_id='ef5fd0df-7b30-493c-94ca-86eb2bfc37f5'):
        _loc_1 = page.locator("internal:role=link[name=\"Search the board\"i]")
        
        await _loc_1.click()
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the Search the board heading to be visible', instruction_id='a047c24e-bc36-4686-aae6-8466d9809e81'):
            await page.wait_for_timeout(500)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "the heading 'Search the board' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Extracting the post page title'):
        set_var('post_page_title_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {11: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(11).textContent.trim());\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="Search the board"i]'], query='the post title in the page heading', expected_value='Search the board', needs_unit_conversion=False, operator='equals', transforms=['strip'], condition='The post page shows its title.'))
    
    async with testmu.step('Checking whether the Shipped timeline status is reached'):
        set_var('shipped_status_reached', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {15: 0};\n  const el = (i) => els[__m[i]];\n  const __v = ([...el(15).querySelectorAll('li')].some(item => item.textContent.trim() === 'Shipped' && !!item.querySelector('.bg-shipped')));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=list[name="Status timeline"i]'], query='whether the Shipped item in the status timeline is reached', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="The status timeline shows 'Shipped' as reached."))
    
    async with testmu.step('Checking for a Passed Kane CLI verification entry'):
        set_var('kane_cli_verifications_passed_entry', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {22: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(22).textContent.trim().startsWith('Passed'));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:testid=[data-testid="run"s]'], query='whether the Kane CLI verifications list contains a Passed entry', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="A 'Kane CLI verifications' section contains a 'Passed' entry."))
    
    async with testmu.step('Assertion check', instruction_id='7d3de859-0b36-4195-be8f-d71f1d3c34f0'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': 'The post page shows its title.', 'passed': True, 'operator': 'equals', 'transforms': ['strip'], 'json_path': None, 'expected': 'Search the board', 'extracted_value': '{{post_page_title_check}}', 'store_key': 'post_page_title_check', 'variable_refs': {'{{post_page_title_check}}': 'Search the board'}}, {'description': "The status timeline shows 'Shipped' as reached.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{shipped_status_reached}}', 'store_key': 'shipped_status_reached', 'variable_refs': {'{{shipped_status_reached}}': 'true'}}, {'description': "A 'Kane CLI verifications' section contains a 'Passed' entry.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{kane_cli_verifications_passed_entry}}', 'store_key': 'kane_cli_verifications_passed_entry', 'variable_refs': {'{{kane_cli_verifications_passed_entry}}': 'true'}}], 'sub_checks': [{'description': 'The post page shows its title.', 'store_key': 'post_page_title_check', 'expected_value': 'Search the board', 'extracted_value': '{{post_page_title_check}}', 'operator': 'equals', 'transforms': ['strip']}, {'description': "The status timeline shows 'Shipped' as reached.", 'store_key': 'shipped_status_reached', 'expected_value': 'true', 'extracted_value': '{{shipped_status_reached}}', 'operator': 'equals', 'transforms': []}, {'description': "A 'Kane CLI verifications' section contains a 'Passed' entry.", 'store_key': 'kane_cli_verifications_passed_entry', 'expected_value': 'true', 'extracted_value': '{{kane_cli_verifications_passed_entry}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "The post page shows its title, a status timeline where 'Shipped' is reached, and a 'Kane CLI verifications' section with a 'Passed' entry."})


if __name__ == "__main__":
    testmu.run(test)