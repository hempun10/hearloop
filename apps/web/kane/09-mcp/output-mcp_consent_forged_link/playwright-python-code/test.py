import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="6df0002c-6aab-4bfb-9351-69238ed730c1",
    name="Verify Invalid Consent Link Behavior",
    tc_id="TC-54",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"invalid_or_expired_message_visible": "true", "allow_button_visible": "false"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 640391, "name": "mcp_authorize_url", "value": "http://localhost:3000/api/auth/oauth2/authorize?response_type=code&client_id=grusIkoOXLBrjqAMVwgPxpGFikBoDARa&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid+profile+offline_access&code_challenge=BrMY0phiUmLzPtJUjuiJcVLNIo_W151yw33ZhU1nvb8&code_challenge_method=S256&state=kane&resource=http%3A%2F%2Flocalhost%3A3000%2Fmcp", "session_value": "http://localhost:3000/api/auth/oauth2/authorize?response_type=code&client_id=grusIkoOXLBrjqAMVwgPxpGFikBoDARa&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid+profile+offline_access&code_challenge=BrMY0phiUmLzPtJUjuiJcVLNIo_W151yw33ZhU1nvb8&code_challenge_method=S256&state=kane&resource=http%3A%2F%2Flocalhost%3A3000%2Fmcp", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 640392, "name": "mcp_deny_url", "value": "http://localhost:3000/api/auth/oauth2/authorize?response_type=code&client_id=hrowywDKEDWjuTmjMlEgTmmHCVIHhSIb&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid+profile+offline_access&code_challenge=BrMY0phiUmLzPtJUjuiJcVLNIo_W151yw33ZhU1nvb8&code_challenge_method=S256&state=kane&resource=http%3A%2F%2Flocalhost%3A3000%2Fmcp", "session_value": "http://localhost:3000/api/auth/oauth2/authorize?response_type=code&client_id=hrowywDKEDWjuTmjMlEgTmmHCVIHhSIb&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid+profile+offline_access&code_challenge=BrMY0phiUmLzPtJUjuiJcVLNIo_W151yw33ZhU1nvb8&code_challenge_method=S256&state=kane&resource=http%3A%2F%2Flocalhost%3A3000%2Fmcp", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/login?next=%2Fconsent%3Fclient_id%3Devil%26sig%3Dforged', instruction_id='db1eb2d7-2160-4428-8098-fbc8919f4cfc'):
        variable_value_0 = var('{{global.base_url}}/login?next=%2Fconsent%3Fclient_id%3Devil%26sig%3Dforged')
        await page.goto(variable_value_0)
    
    async with testmu.step('Waiting for the sign-in steps to complete', instruction_id='33ee9ab7-a067-4e65-8dce-60f3a6c9bdad'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "{{global.e2e_email}}" into "Email"', instruction_id='2c2f4c01-e008-4f1f-882d-3b01e15aceef'):
        element_1 = page.locator("internal:role=textbox[name=\"Email\"i]")
        variable_value_2 = var('{{global.e2e_email}}')
        
        await testmu.fill(element_1, variable_value_2)
    
    async with testmu.step('Type "[REDACTED]" into "Password"', instruction_id='d70c18a2-06da-4e32-941c-26f124552074'):
        element_3 = page.locator("internal:role=textbox[name=\"Password\"i]")
        variable_value_4 = var('{{secrets.user.e2e_password}}')
        
        await testmu.fill(element_3, variable_value_4)
    
    async with testmu.step('Clicking Sign in button in sign-in form', instruction_id='0d6c7adb-4ccb-476a-9939-3df3a678b1bd'):
        _loc_1 = page.locator("internal:role=button[name=\"Sign in\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Checking whether the invalid or expired link message is present'):
        set_var('invalid_or_expired_message_visible', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {13: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(13).textContent.trim() === 'This link is invalid or expired');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="This link is invalid or"i]'], query="whether the heading 'This link is invalid or expired' is present in the main page content", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="The page says 'This link is invalid or expired'."))
    
    async with testmu.step("whether an 'Allow' button is visible on the page", instruction_id='4a469cab-17b4-490d-94cc-bd6709413d9d'):
        set_var('allow_button_visible', await testmu.vision_query(page, "whether an 'Allow' button is visible on the page", ""))
    
    async with testmu.step('Assertion check', instruction_id='cb183fec-b9fe-43a5-b758-a23090bd3b77'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "The page says 'This link is invalid or expired'.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{invalid_or_expired_message_visible}}', 'store_key': 'invalid_or_expired_message_visible', 'variable_refs': {'{{invalid_or_expired_message_visible}}': 'true'}}, {'description': "There is no 'Allow' button.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'false', 'extracted_value': '{{allow_button_visible}}', 'store_key': 'allow_button_visible', 'variable_refs': {'{{allow_button_visible}}': 'false'}}], 'sub_checks': [{'description': "The page says 'This link is invalid or expired'.", 'store_key': 'invalid_or_expired_message_visible', 'expected_value': 'true', 'extracted_value': '{{invalid_or_expired_message_visible}}', 'operator': 'equals', 'transforms': []}, {'description': "There is no 'Allow' button.", 'store_key': 'allow_button_visible', 'expected_value': 'false', 'extracted_value': '{{allow_button_visible}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the page says 'This link is invalid or expired' and there is no 'Allow' button."})


if __name__ == "__main__":
    testmu.run(test)