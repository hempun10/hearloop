import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="b0665955-7933-4e19-a169-601554b4d0cc",
    name="Verify Sign In Page Display",
    tc_id="TC-15",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"sign_in_heading_visible": "true", "email_fields_visible": "true", "password_fields_visible": "true", "dashboard_visible": "false"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/acme/dashboard', instruction_id='fc5369fa-299e-43c5-9883-968900244553'):
        variable_value_0 = var('{{global.base_url}}/acme/dashboard')
        await page.goto(variable_value_0)
    
    async with testmu.step('Checking whether the Sign in heading is present'):
        set_var('sign_in_heading_visible', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {8: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(8).textContent.trim() === 'Sign in' && !!(el(8).offsetWidth || el(8).offsetHeight || el(8).getClientRects().length));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="Sign in"i]'], query="whether the 'Sign in' heading in the main login content is present", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="the page shows the 'Sign in' heading"))
    
    async with testmu.step('Checking whether the email field is present'):
        set_var('email_fields_visible', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {12: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(12).type === 'email' && !!(el(12).offsetWidth || el(12).offsetHeight || el(12).getClientRects().length));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=textbox[name="Email"i]'], query='whether the email field in the Sign in form is present', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='the page shows email fields'))
    
    async with testmu.step('Checking whether the password field is present'):
        set_var('password_fields_visible', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {14: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(14).type === 'password' && !!(el(14).offsetWidth || el(14).offsetHeight || el(14).getClientRects().length));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=textbox[name="Password"i]'], query='whether the password field in the Sign in form is present', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='the page shows password fields'))
    
    async with testmu.step('whether the dashboard is present on the visible page', instruction_id='a1124517-3a42-4f9c-936c-2e64e8dea6a9'):
        set_var('dashboard_visible', await testmu.vision_query(page, "whether the dashboard is present on the visible page", ""))
    
    async with testmu.step('Assertion check', instruction_id='1702cdb6-126c-4df0-b1d8-aa054d6c5c25'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the page shows the 'Sign in' heading", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{sign_in_heading_visible}}', 'store_key': 'sign_in_heading_visible', 'variable_refs': {'{{sign_in_heading_visible}}': 'true'}}, {'description': 'the page shows email fields', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{email_fields_visible}}', 'store_key': 'email_fields_visible', 'variable_refs': {'{{email_fields_visible}}': 'true'}}, {'description': 'the page shows password fields', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{password_fields_visible}}', 'store_key': 'password_fields_visible', 'variable_refs': {'{{password_fields_visible}}': 'true'}}, {'description': 'the page does not show the dashboard', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'false', 'extracted_value': '{{dashboard_visible}}', 'store_key': 'dashboard_visible', 'variable_refs': {'{{dashboard_visible}}': 'false'}}], 'sub_checks': [{'description': "the page shows the 'Sign in' heading", 'store_key': 'sign_in_heading_visible', 'expected_value': 'true', 'extracted_value': '{{sign_in_heading_visible}}', 'operator': 'equals', 'transforms': []}, {'description': 'the page shows email fields', 'store_key': 'email_fields_visible', 'expected_value': 'true', 'extracted_value': '{{email_fields_visible}}', 'operator': 'equals', 'transforms': []}, {'description': 'the page shows password fields', 'store_key': 'password_fields_visible', 'expected_value': 'true', 'extracted_value': '{{password_fields_visible}}', 'operator': 'equals', 'transforms': []}, {'description': 'the page does not show the dashboard', 'store_key': 'dashboard_visible', 'expected_value': 'false', 'extracted_value': '{{dashboard_visible}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the page shows the 'Sign in' heading with email and password fields, not the dashboard"})


if __name__ == "__main__":
    testmu.run(test)